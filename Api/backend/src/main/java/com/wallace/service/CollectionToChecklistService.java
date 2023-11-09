package com.wallace.service;

import com.wallace.pojo.CollectionToChecklist;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wallace.utils.Result;

/**
* @author y1693
* @description 针对表【collection_to_checklist】的数据库操作Service
* @createDate 2023-11-07 23:52:24
*/
public interface CollectionToChecklistService extends IService<CollectionToChecklist> {

    Result updateRecent(Integer cid, Integer uid);
}
