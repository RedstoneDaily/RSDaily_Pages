<script lang="ts" setup>
import router from '@/router';
import { computed, ref } from 'vue';
const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();

/**
 * 关闭对话框
 */
const close = () => {
    emit('update:modelValue', false);
};

interface DayObj { id: number, title: string, content: string }

interface MonObj { m: string, list: DayObj[] }

interface YearObj { y: string; list: MonObj[] }

// 所有数据的列表
let alldatelist: YearObj[] = []

// 定义选择的年份和月份
const chooseY = ref('')
const chooseM = ref('')

// 定义最新日期和最佬日期
let nowDate: string, oldDate: string;
/**
* 生成日期列表
* @param {string} startDateStr 开始日期，格式为YYYY-MM-DD
* @param {string} endDateStr 结束日期，格式为YYYY-MM-DD
* @returns {Array} 返回一个包含年份对象的数组，每个年份对象包含月份和日期列表
*/
function generateDateList(startDateStr: string, endDateStr: string) {
    // 将开始日期和结束日期字符串转换为数字数组
    let [newYear, newMonth] = startDateStr.split('-').map(Number);
    let [oldYear, oldMonth] = endDateStr.split('-').map(Number);

    // 创建一个空数组，用于存储结果
    const result: YearObj[] = [];

    // 遍历从新日期到旧日期
    while (newYear > oldYear || (newYear === oldYear && newMonth >= oldMonth)) {
        // 在结果数组中查找是否存在当前年份的对象
        let yearObj = result.find(item => item.y === String(newYear));

        // 如果不存在，则创建一个新的年份对象并添加到结果数组中
        if (!yearObj) {
            yearObj = { y: String(newYear), list: [] };
            result.push(yearObj);
        }

        // 将当前月份添加到年份对象对应的月份列表中
        yearObj.list.push({
            m: String(newMonth).padStart(2, '0'), // 保证月份为两位数字格式
            list: [] // 这里可以存放具体日期，暂时为空数组
        });

        // 减少月份，如果月份减到0，则年份减1，月份置为12
        newMonth--;
        if (newMonth === 0) {
            newMonth = 12;
            newYear--;
        }
    }

    return result;
}

/**
 * 请求日志数据
 * @param {string} nowDate 当前日期，格式为YYYY-MM
 * @return {Promise<DayObj[]>} 返回一个Promise对象，包含当前月份的日志数据
*/
const getList = async (nowDate: string): Promise<DayObj[]> => {
    // 使用-分割字符串
    const [year, month] = nowDate.split('-');
    // 获取当月的最大天数
    const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
    // 请求日志数据
    const response = await fetch(`https://api.rsdaily.com/v2/daily/query?start_date=${year}-${month}-01&end_date=${year}-${month}-${daysInMonth}`)
    // 如果响应失败，则抛出错误
    if (!response.ok) {
        throw new Error('网络响应不正常');
    }
    // 解析JSON数据
    const data: { [key: string]: { aid: number, data: string, title: string }[] } = await response.json();

    // 先定义一个数组来存储数据，使用Object.keys获取所有键，用filter筛选出值数组长度大于0的键，返回对象：日期键，当前日期的第0项的内容标题
    const myData: DayObj[] = Object.keys(data)
        .filter(key => data[key].length > 0)
        .map(key => {
            return {
                id: data[key][0].aid,
                title: key,
                content: data[key][0].title
            }
        });
    return myData
};

// 集体请求日期
Promise.all([
    fetch('https://api.rsdaily.com/v2/daily'),
    fetch('https://api.rsdaily.com/v2/daily/earliest')
])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([data1, data2]) => {
        // 请求到数据后将 nowDate 和 oldDate 赋值
        nowDate = data1[0].date as string;
        oldDate = data2[0].date as string;
        // 初始化（当前日期）
        const [y, m] = nowDate.split('-')
        chooseY.value = y
        chooseM.value = m
        // 生成日期列表
        alldatelist = generateDateList(nowDate, oldDate);

        // 通过日期列表遍历请求年月的信息
        alldatelist.map(year => {
            year.list.map(month => {
                getList(`${year.y}-${month.m}`).then(data => {

                    month.list = data
                    console.log(month.list);
                })
            })
        })

        console.log(alldatelist);

    })
    .catch(error => {
        console.error('错误:', error);
    });

console.log(alldatelist.find(item => item.y === '2024'));



// 要展示出的列出项
const list = computed(() => {
    return alldatelist.find(item => item.y === chooseY.value)?.list.find(item => item.m === chooseM.value)?.list
})

// 是否正在选择
const isCloose = ref(0)


</script>

<template>
    <teleport to="body">
        <Transition name="animationBox">
            <div v-if="props.modelValue" class="box-Mask" @click="close()">
                <div class="box" @click.stop>
                    <h1>选择往期日报</h1>
                    <div class="date">

                        <span @click="isCloose = 1">{{ chooseY }}</span>
                        /
                        <span @click="isCloose = 2">{{ chooseM }}</span>

                    </div>

                    <div v-show="isCloose === 0" class="items">
                        <!-- 显示列表 -->
                        <div class="item" v-for="item in list" :key="item.id" @click="() => {
                            router.push('/content?date=' + item.title)
                            close()
                        }">
                            <span style="display: inline-block; width: 56px;">
                                {{ item.title.slice(5, 10) }}
                            </span>
                            {{ item.content }}
                        </div>

                    </div>
                    <div v-show="isCloose === 1" class="items">
                        <!-- 年份 -->
                        <div class="yitem" v-for="item in alldatelist" :key="item.y" @click="() => {
                            chooseY = item.y
                            isCloose = 2
                        }">{{ item.y }}</div>
                    </div>
                    <div v-show="isCloose === 2" class="items">
                        <!-- 月份 -->
                        <div class="mitem" v-for="item in alldatelist.find(item => item.y === chooseY)?.list"
                            :key="item.m" @click="() => {
                                chooseM = item.m
                                isCloose = 0
                            }">
                            {{ item.m }}</div>
                    </div>
                </div>
            </div>
        </Transition>
    </teleport>
</template>

<style lang="scss" scoped>
.animationBox-enter-active,
.animationBox-leave-active {
    transition: all 0.2s ease;
}

.animationBox-enter-from,
.animationBox-leave-to {
    /* transform: translateY(20px); */
    opacity: 0;
}

@keyframes c {
    from {
        transform: translateY(8px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.box-Mask {
    width: 100vw;
    height: 100vh;
    color: white;
    backdrop-filter: blur(10px);
    background-color: rgba(0, 0, 0, 0.4);

    position: fixed;
    top: 0;
    left: 0;
}

.box {
    width: 40vw;
    height: 60vh;
    background-color: rgba(0, 0, 0, 0.77);
    position: fixed;
    top: calc(50% - 30vh);
    left: calc(50% - 20vw);
    display: flex;
    flex-direction: column;

    h1 {
        padding: 10px;
        margin: 0;
        text-align: center;
    }

    .date {
        display: flex;
        justify-content: center;
        gap: 4px;
        padding: 10px 0;
        background-color: #ffffff3d;

        span {
            cursor: pointer;
        }

        span::after {
            content: "";
            display: block;
            width: 0;
            height: 2px;
            background-color: var(--red-color);
            transition: width 0.5s;
        }

        span:hover::after {
            width: 100%;
        }
    }

    .items {
        flex: 1;
        padding: 10px;
        display: flex;
        flex-wrap: wrap;
        align-content: flex-start;
        justify-content: space-between;
        overflow: overlay;
        animation-duration: 0.3s;
        animation-name: c;

        .item {
            cursor: pointer;
            flex: 0 1 49%;
            padding: 8px 2px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            transition: all 0.5s;
        }

        .yitem {
            text-align: center;
            cursor: pointer;
            flex: 0 1 33.33%;
            padding: 20px 0;
            transition: all 0.5s;
        }

        .mitem {
            text-align: center;
            cursor: pointer;
            flex: 0 1 33.32%;
            padding: 18px 0;
            transition: all 0.5s;
        }

        .item:hover,
        .mitem:hover,
        .yitem:hover {
            background-color: #ffffff66;
        }
    }

    .items::-webkit-scrollbar {
        width: 6px;
    }

    .items::-webkit-scrollbar-thumb {
        background-color: #ffffff66;
    }
}
</style>
