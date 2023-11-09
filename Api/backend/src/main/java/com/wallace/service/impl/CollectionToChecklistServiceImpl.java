package com.wallace.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.mapper.ListcollectionMapper;
import com.wallace.pojo.CollectionToChecklist;
import com.wallace.pojo.Listcollection;
import com.wallace.service.CollectionToChecklistService;
import com.wallace.mapper.CollectionToChecklistMapper;
import com.wallace.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Date;

/**
* @author y1693
* @description 针对表【collection_to_checklist】的数据库操作Service实现
* @createDate 2023-11-07 23:52:24
*/
@Service
public class CollectionToChecklistServiceImpl extends ServiceImpl<CollectionToChecklistMapper, CollectionToChecklist>
    implements CollectionToChecklistService{

    @Resource
    private ListcollectionMapper listcollectionMapper;
    @Resource
    private CollectionToChecklistMapper collectionToChecklistMapper;

    @Override
    public Result updateRecent(Integer cid, Integer uid) {
        Listcollection listcollection = listcollectionMapper.selectByTypeAndUid("recent",uid);
        Date currentDate = new Date();
        Timestamp timestamp = new Timestamp(currentDate.getTime());
        int i = collectionToChecklistMapper.updateTime(listcollection.getColid(),cid,timestamp);
        return Result.ok(i);
    }
}




