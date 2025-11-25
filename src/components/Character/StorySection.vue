<template>
  <div class="story-section">
    <div class="stage-info">
      <el-alert :title="`${stageName}階段 (好感度: ${minAffection}-${maxAffection})`" type="info" :closable="false" />
    </div>

    <el-form label-position="top">
      <div v-for="(story, index) in stories" :key="index" class="story-item">
        <div class="story-header">
          <h3>{{ stageName }}私密物語 {{ index + 1 }}</h3>
          <el-button type="danger" circle @click="$emit('remove', index)" :disabled="stories.length <= 1">
            <el-icon>
              <Delete />
            </el-icon>
          </el-button>
        </div>

        <el-row :gutter="20">
          <el-col :xs="24" :lg="12">
            <el-form-item label="🔓 解鎖時的提示語">
              <TextareaWithCopy v-model="story.unlockHint" placeholder="當玩家解鎖此故事時顯示的提示語" :rows="2" :max-length="60"
                @input="$emit('update')" />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :lg="12">
            <el-form-item label="📖 故事標題">
              <TextareaWithCopy v-model="story.title" placeholder="故事的標題" :rows="2" :max-length="30"
                @input="$emit('update')" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="📝 故事內容">
          <span class="hint-text">故事內容將以換行為準，每次呈現一行</span>
          <TextareaWithCopy v-model="story.content" placeholder="私密物語的完整內容 (500-2000字)" :rows="10" :min-length="500"
            :max-length="2000" @input="$emit('update')" />
        </el-form-item>

        <el-form-item label="💖 啟用好感度分數">
          <el-input-number v-model="story.requiredAffection" :min="minAffection" :max="maxAffection" :step="1"
            @change="$emit('update')" />
          <span class="hint-text">（需達到此好感度才會解鎖此故事）</span>
        </el-form-item>

        <div class="options-section">
          <h4>🎯 多重結局選項(無則不須填寫)</h4>
          <div v-for="(option, optIndex) in story.options" :key="optIndex" class="option-item">
            <div class="option-header">
              <h5>選項 {{ optIndex + 1 }}</h5>
            </div>

            <el-form-item label="選擇選項">
              <TextareaWithCopy v-model="option.choice" placeholder="向玩家顯示的選項內容" :rows="2" :max-length="100"
                @input="$emit('update')" />
            </el-form-item>

            <el-row :gutter="20">
              <el-col :xs="24" :lg="18">
                <el-form-item label="選擇的結局">
                  <TextareaWithCopy v-model="option.outcome" placeholder="選擇此選項後的結局描述" :rows="4" :max-length="500"
                    @input="$emit('update')" />
                </el-form-item>
              </el-col>
              <el-col :xs="24" :lg="6">
                <el-form-item label="好感度變化(-20 ~ +20)">
                  <el-input-number v-model="option.affectionChange" :min="-20" :max="20" :step="1"
                    @change="$emit('update')" />
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </div>

        <el-divider v-if="index < stories.length - 1" />
      </div>
    </el-form>

    <div class="section-footer">
      <el-button type="primary" @click="$emit('add')" style="width: 80%;">
        <el-icon>
          <Plus />
        </el-icon>
        新增{{ stageName }}私密物語
      </el-button>
    </div>
  </div>
</template>

<script>
import { Delete, Plus } from '@element-plus/icons-vue'
import TextareaWithCopy from '@/components/Common/TextareaWithCopy.vue'

export default {
  name: 'StorySection',
  components: {
    TextareaWithCopy,
    Delete,
    Plus
  },
  props: {
    stories: {
      type: Array,
      required: true
    },
    stageName: {
      type: String,
      required: true
    },
    minAffection: {
      type: Number,
      required: true
    },
    maxAffection: {
      type: Number,
      required: true
    }
  },
  emits: ['update', 'add', 'remove']
}
</script>

<style lang="scss" scoped>
.story-section {
  padding: 10px 0;
}

.stage-info {
  margin-bottom: 20px;
}

.story-item {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.story-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    margin: 0;
    color: #409eff;
  }
}

.options-section {
  margin-top: 30px;
  background: white;
  padding: 20px;
  border-radius: 8px;

  h4 {
    margin-top: 0;
    margin-bottom: 20px;
    color: #333;
  }
}

.option-item {
  padding: 15px;
  background: #f0f2f5;
  border-radius: 6px;
  margin-bottom: 15px;

  &:last-child {
    margin-bottom: 0;
  }
}

.option-header {
  margin-bottom: 15px;

  h5 {
    margin: 0;
    color: #666;
    font-size: 0.95em;
  }
}

.hint-text {
  margin-left: 10px;
  color: #999;
  font-size: 0.9em;
}

.section-footer {
  text-align: center;
  margin-top: 20px;
  padding: 20px;
}

@media (max-width: 768px) {

  .hint-text {
    margin-left: 0px;
  }

  .story-item {
    padding: 5px;
  }

  .options-section {
    padding: 5px;
  }

  .option-item {
    padding: 5px;
  }
}
</style>
