<template>
  <div class="calculator">
    <input type="text" v-model="expression" readonly />
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
  { label: '7', value: '7' },
  { label: '8', value: '8' },
  { label: '9', value: '9' },
  { label: '+', value: '+' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },
  { label: '6', value: '6' },
  { label: '-', value: '-' },
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '*', value: '*' },
  { label: '0', value: '0' },
  { label: '.', value: '.' },
  { label: '=', value: '=' },
  { label: '/', value: '/' }
];

const handleClick = (button: Button): void => {
  if (button.value === '=') {
    expression.value = eval(expression.value);
  } else {
    expression.value += button.value;
  }
};
</script>

<style scoped>
.calculator {
  width: 200px;
  margin: auto;
  text-align: center;
}

.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 5px;
}

button {
  padding: 10px;
  background-color: #eee;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #ddd;
}
</style>
