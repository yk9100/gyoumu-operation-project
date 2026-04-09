<template>
  <div>
    <h1>用户情報</h1>
    
    <!-- 导航链接 -->
    <div class="nav-links">
      <a href="#basic-info">基本情報</a>
      <a href="#personnel-info">人事情報</a>
      <a href="#salary-info">給与情報</a>
    </div>
    
    <!-- 基本情報部分 -->
    <section id="basic-info" class="info-section">
      <h2>基本情報</h2>
      <p>ここは基本情報の内容です。</p>
      <div class="content">
        <p>名前: 山田太郎</p>
        <p>生年月日: 1990年1月1日</p>
        <p>住所: 東京都新宿区</p>
        <p>電話番号: 0123-456-7890</p>
      </div>
    </section>
    
    <!-- 人事情報部分 -->
    <section id="personnel-info" class="info-section">
      <h2>人事情報</h2>
      <p>ここは人事情報の内容です。</p>
      <div class="content">
        <p>入社日: 2020年4月1日</p>
        <p>所属: 開発部</p>
        <p>役職: エンジニア</p>
        <p>上司: 佐藤健</p>
      </div>
    </section>
    
    <!-- 給与情報部分 -->
    <section id="salary-info" class="info-section">
      <h2>給与情報</h2>
      <p>ここは給与情報の内容です。</p>
      <div class="content">
        <p>基本給: 30万円</p>
        <p>手当: 5万円</p>
        <p>賞与: 年2回</p>
        <p>休暇: 年間10日</p>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
// 用户情報ページのロジック
</script>

<style scoped>
.nav-links {
  margin: 20px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
}

.nav-links a {
  margin-right: 20px;
  text-decoration: none;
  color: #1890ff;
}

.nav-links a:hover {
  text-decoration: underline;
}

.info-section {
  margin: 40px 0;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 4px;
}

.info-section h2 {
  margin-top: 0;
  color: #333;
}

.content {
  margin-top: 10px;
  line-height: 1.5;
}
</style>