import request from "@/utils/request";

// 获取平台属性
export const reqAttrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};

// 获取销售属性
export const reqSpuSaleAttrList = spuId => {
  return request({
    url: `/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });
};

// 获取图片列表
export const reqSpuImageList = spuId => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
};

// 添加SKU
export const reqSaveSkuInfo = (data) => {
  return request({
    url: `/admin/product/saveSkuInfo`,
    method: "post",
    data,
  });
};

