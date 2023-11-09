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
    Result insertByInit();

    Result updateRecent(Integer cid, Integer uid);

    Result putFavor(Integer cid, Integer uid);

    Result deleteFavor(Integer cid, Integer uid);

    Result putTeam(Integer cid, Integer uid);

    Result deleteTeam(Integer cid, Integer uid);

    Result searchFavor(Integer cid, Integer uid);
}
