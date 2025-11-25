<template>
  <div class="form-section">
    <div class="section-header">
      <h2>🔐 私密物語</h2>
    </div>

    <el-tabs v-model="activeTab" type="border-card" class="secret-stories-tabs">
      <!-- 熟人階段 -->
      <el-tab-pane label="熟人 (0-19)" name="acquaintance">
        <StorySection
          :stories="character.secretStories.acquaintance"
          stage-name="熟人"
          :min-affection="0"
          :max-affection="19"
          @update="updateCharacter"
          @add="addStory('acquaintance')"
          @remove="removeStory('acquaintance', $event)"
        />
      </el-tab-pane>

      <!-- 朋友階段 -->
      <el-tab-pane label="朋友 (20-49)" name="friend">
        <StorySection
          :stories="character.secretStories.friend"
          stage-name="朋友"
          :min-affection="20"
          :max-affection="49"
          @update="updateCharacter"
          @add="addStory('friend')"
          @remove="removeStory('friend', $event)"
        />
      </el-tab-pane>

      <!-- 心動階段 -->
      <el-tab-pane label="心動 (50-399)" name="crush">
        <StorySection
          :stories="character.secretStories.crush"
          stage-name="心動"
          :min-affection="50"
          :max-affection="399"
          @update="updateCharacter"
          @add="addStory('crush')"
          @remove="removeStory('crush', $event)"
        />
      </el-tab-pane>

      <!-- 戀人階段 -->
      <el-tab-pane label="戀人 (400-3999)" name="lover">
        <StorySection
          :stories="character.secretStories.lover"
          stage-name="戀人"
          :min-affection="400"
          :max-affection="3999"
          @update="updateCharacter"
          @add="addStory('lover')"
          @remove="removeStory('lover', $event)"
        />
      </el-tab-pane>

      <!-- 結婚階段 -->
      <el-tab-pane label="結婚 (4000+)" name="married">
        <StorySection
          :stories="character.secretStories.married"
          stage-name="結婚"
          :min-affection="4000"
          :max-affection="999999"
          @update="updateCharacter"
          @add="addStory('married')"
          @remove="removeStory('married', $event)"
        />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useCharacterStore } from '@/stores/character'
import { ElMessage, ElMessageBox } from 'element-plus'
import StorySection from './StorySection.vue'

export default {
  name: 'SecretStories',
  components: {
    StorySection
  },
  setup() {
    const characterStore = useCharacterStore()
    const character = computed(() => characterStore.character)
    const activeTab = ref('acquaintance')

    const updateCharacter = () => {
      characterStore.markAsDirty()
    }

    const getDefaultStory = (stage, minAffection) => {
      return {
        unlockHint: "",
        title: "",
        content: "",
        options: [
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 },
          { choice: "", outcome: "", affectionChange: 0 }
        ],
        requiredAffection: minAffection
      }
    }

    const addStory = (stage) => {
      const affectionMap = {
        acquaintance: 0,
        friend: 20,
        crush: 50,
        lover: 400,
        married: 4000
      }

      character.value.secretStories[stage].push(
        getDefaultStory(stage, affectionMap[stage])
      )
      updateCharacter()
      ElMessage.success('已新增私密物語')
    }

    const removeStory = (stage, index) => {
      ElMessageBox.confirm(
        `故事標題：${character.value.secretStories[stage][index].title || '(未命名)'}`,
        '是否確認刪除此私密物語？',
        {
          confirmButtonText: '刪除',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        if (character.value.secretStories[stage].length <= 1) {
          ElMessage.warning('每個階段至少需要保留一個私密物語')
          return
        }
        character.value.secretStories[stage].splice(index, 1)
        updateCharacter()
        ElMessage.success('已刪除私密物語')
      }).catch(() => {
        ElMessage({
          type: 'info',
          message: '取消刪除',
        })
      })
    }

    return {
      character,
      activeTab,
      updateCharacter,
      addStory,
      removeStory
    }
  }
}
</script>

<style lang="scss" scoped>
.form-section {
  @include form-section;
}

.section-description {
  color: #666;
  font-size: 0.9em;
  margin-top: 5px;
}

.secret-stories-tabs {
  margin-top: 20px;
}

:deep(.el-tabs__content) {
  padding: 20px;
}
</style>
