export default defineNuxtRouteMiddleware((to, from) => {
  // 匹配 /project-management/detail 路径
  if (
    to.path === "/project-management/detail" ||
    to.path === "/project-management/detail/"
  ) {
    return navigateTo("/project-management/list");
  }

  // 匹配 /project-management/detail/:id/step (缺少 step 序号)
  const stepWithoutNumberRegex = /^\/project-management\/detail\/(\d+)\/step$/;
  const match = to.path.match(stepWithoutNumberRegex);

  if (match) {
    const id = match[1];
    return navigateTo(`/project-management/detail/${id}/step/1`);
  }

  // 匹配 /project-management/detail/:id (缺少 /step)
  const detailWithoutStepRegex = /^\/project-management\/detail\/(\d+)$/;
  const detailMatch = to.path.match(detailWithoutStepRegex);

  if (detailMatch) {
    const id = detailMatch[1];
    return navigateTo(`/project-management/detail/${id}/step/1`);
  }
});
