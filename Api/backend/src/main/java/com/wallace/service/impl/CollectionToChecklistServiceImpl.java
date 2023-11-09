package com.wallace.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.mapper.ListcollectionMapper;
import com.wallace.pojo.CkList;
import com.wallace.pojo.CollectionToChecklist;
import com.wallace.pojo.Listcollection;
import com.wallace.service.CollectionToChecklistService;
import com.wallace.mapper.CollectionToChecklistMapper;
import com.wallace.utils.Result;
import com.wallace.utils.ResultCodeEnum;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static java.util.Arrays.asList;

/**
 * @author y1693
 * @description 针对表【collection_to_checklist】的数据库操作Service实现
 * @createDate 2023-11-07 23:52:24
 */
@Service
public class CollectionToChecklistServiceImpl extends ServiceImpl<CollectionToChecklistMapper, CollectionToChecklist>
        implements CollectionToChecklistService {

    @Resource
    private ListcollectionMapper listcollectionMapper;
    @Resource
    private CollectionToChecklistMapper collectionToChecklistMapper;

    @Override
    public Result insertByInit() {
        List<CkList> cklists = new ArrayList<>();
        cklists = listcollectionMapper.selectByUid(1);

        List<CollectionToChecklist> collectionToChecklists = new ArrayList<>();
        List<Integer> bestIds = asList(1, 2, 6, 16, 63, 110, 186, 220, 227);

        for (Integer bestId : bestIds) {
            CollectionToChecklist collectionToChecklist = new CollectionToChecklist();
            collectionToChecklist.setCid(bestId);
            collectionToChecklist.setColid(1);
            collectionToChecklist.setIsDeleted(0);
            collectionToChecklist.setVersion(1);
            Date currentDate = new Date();
            Timestamp timestamp = new Timestamp(currentDate.getTime());
            collectionToChecklist.setViewTime(timestamp);
            collectionToChecklists.add(collectionToChecklist);
        }

        int i = collectionToChecklistMapper.insertBatchSomeColumn(collectionToChecklists);
        if (i > 0) return Result.ok(null);
        return Result.build(404, ResultCodeEnum.FAILED);

    }


    @Override
    public Result updateRecent(Integer cid, Integer uid) {
        Listcollection listcollection = listcollectionMapper.selectByTypeAndUid("recent", uid);
        Date currentDate = new Date();
        Timestamp timestamp = new Timestamp(currentDate.getTime());
        int i = collectionToChecklistMapper.updateTime(listcollection.getColid(), cid, timestamp);
        return Result.ok(i);
    }
}




