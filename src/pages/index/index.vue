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

interface Button {
  label: string;
  value: string;
}

const expression = ref<string>('');
const buttons: Button[] = [
  { label: 'c', value: 'c' },
  { label: 'd', value: 'd' },
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

const handleClick = (button: Button): void => {
  if(button.value === 'c'){
      expression.value = '';
  }else if(button.value === 'd'){
      expression.value = expression.value.slice(0, expression.value.length - 1);
  }else if (button.value === '=') {
    expression.value = eval(expression.value);
  } else {
    expression.value += button.value;
  }
};
</script>

<style scoped>
.calculator {
  width: 100%; /* 让计算器铺满整个页面 */
  height: 100%; /* 让计算器铺满整个页面 */
  display: flex;
  flex-direction: column;
}
.display {
  height: 40vh; /* 占据页面的一半高度 */
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  background-color: #fff;
  padding: 10px;
}

.display div {
  font-size: 1.5em;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}

button {
  padding: 16px;
  background-color: #eee;
  border: none;
  cursor: pointer;
  border-radius: 10px; /* 圆角 */
  flex-grow: 1; /* 让按钮铺满整个容器 */
  font-size: 1.2em; /* 按钮文字大小 */
}

button:hover {
  background-color: #ddd;
}
</style>
