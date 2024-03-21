<template>
  <div class="calculator">
    <div class="display">
      <div>{{ expression }}</div>
    </div>
    <div class="buttons">
      <button v-for="button in buttons" :key="button.value" @click="handleClick(button)">
        {{ button.label }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { evaluateExpression } from './CalculatorUtils';

interface Button {
  label: string;
  value: string;
}

const expression = ref<string>('');
const buttons: Button[] = [
  { label: 'ac', value: 'c' },
  { label: 'del', value: 'd' },
  { label: '%', value: '%' },
  { label: '/', value: '/' },
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '*', value: '*' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '-', value: '-' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '+', value: '+' },
  { label: '@', value: '@' },
  { label: '0', value: '0' },
  { label: '.', value: '.' },
  { label: '=', value: '=' }
];

// 如果操作了=号以后,再录入数字要清空
let closeFlag = false;

const handleClick = (button: Button): void => {
  if(button.value === 'c'){
      expression.value = '';
  }else if(button.value === 'd'){
      expression.value = expression.value.slice(0, expression.value.length - 1);
  }else if (button.value === '@') {
      // TODO 敬请期待
  }else if (button.value === '=') {
    // expression.value = eval(expression.value);
    expression.value = evaluateExpression(expression.value);
    closeFlag = true;
  } else {
    if(closeFlag){
      expression.value = button.value;
      closeFlag = false;
    }else{
      expression.value += button.value;
    }
  }
};
</script>

<style scoped>
.calculator {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ffffff; /* 背景色 */
}

.display {
  height: 50vh;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: #f0f0f0; /* 右边颜色 */
  padding: 10px;
}

.display div {
  font-size: 1.5em;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, auto); /* 自适应按钮宽度 */
  gap: 10px; /* 按钮间距 */
  margin: 5px; /* 左右间距 */
  justify-content: space-evenly; /* 按钮水平间距均匀分布 */
}

button {
  width: 100%;
  padding: 20px;
  background-color: #4caf50; /* 默认按钮颜色 */
  border: none;
  cursor: pointer;
  border-radius: 10px; /* 圆角 */
  font-size: 1.2em;
  text-align: center;
  line-height: 1.2; /* 垂直居中 */
}

button:hover {
  background-color: #8bc34a;
}

/* 设置第一行按钮的颜色为蓝色 */
button:nth-child(-n+4) {
  background-color: #2196f3;
}

/* 设置第四列按钮的颜色为蓝色 */
button:nth-child(4n) {
  background-color: #2196f3;
}

/*  设置@按钮的颜色为蓝色 */
button:nth-child(17) {
  background-color: #2196f3;
}

</style>
