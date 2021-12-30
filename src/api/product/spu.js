import request from "@/utils/request";

// 列表数据
export const reqSpuList = (page, limit, category3Id) => {
  return request({
    url: `/admin/product/${page}/${limit}`,
    method: "get",
    params: {category3Id}
  });
};
// ============================= SpuForm reqs start ======================================= 
export const reqSpuInfo = spuId => {
  return request({
    url: `/admin/product/getSpuById/${spuId}`,
    method: 'get'
  })
}

export const reqTrademarkList = () => {
  return request({
    url: `/admin/product/baseTrademark/getTrademarkList`,
    method: 'get'
  })
}

export const reqBaseSaleAttrList = () => {
  return request({
    url: `/admin/product/baseSaleAttrList`,
    method: 'get'
  })
}

export const reqSpuImageList = spuId => {
  return request({
    url: `/admin/product/spuImageList/${spuId}`,
    method: 'get'
  })
}


// 添加SPU
export const reqSaveSpuInfo = data => {
  return request({
    url: `/admin/product/saveSpuInfo`,
    method: "post",
    data,
  });
};

// 修改SPU
export const reqUpdateSpuInfo = data => {
  return request({
    url: `/admin/product/updateSpuInfo`,
    method: "post",
    data,
  });
};
// =============================== SpuForm reqs start =====================================

// 删除属性
export const reqDeleteAttr = (attrId) => {
  return request({
    url: `/admin/product/deleteAttr/${attrId}`,
    method: "delete",
  });
};
