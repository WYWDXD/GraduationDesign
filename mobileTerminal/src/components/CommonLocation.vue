<!-- <template>
  <div>
    <p>City: {{ city }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const city = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('https://restapi.amap.com/v3/ip', {
      params: {
        key: '112f7278845a2b4a727d04cffeb63b0b',
      },
    });
    console.log(response.data);
    city.value = response.data.city;
  } catch (error) {
    console.error('Error fetching city:', error);
  }
});
</script> -->