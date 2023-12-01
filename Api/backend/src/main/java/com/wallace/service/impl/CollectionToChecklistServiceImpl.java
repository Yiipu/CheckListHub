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
    String[] returnEmpty = new String[0];

    @Resource
    private ListcollectionMapper listcollectionMapper;
    @Resource
    private CollectionToChecklistMapper collectionToChecklistMapper;

    @Override
    public Result insertByInit() {
//        List<CkList> cklists = new ArrayList<>();
//        cklists = listcollectionMapper.selectByUid(1);

        List<CollectionToChecklist> collectionToChecklists = new ArrayList<>();
        List<Integer> bestIds = asList(6, 7, 11, 21, 68, 115, 191, 225, 232);

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
        if (i > 0) return Result.ok(returnEmpty);
        return Result.build(returnEmpty, 404, "null");

    }


    @Override
    public Result updateRecent(Integer cid, Integer uid) {
        Listcollection listcollection = listcollectionMapper.selectByTypeAndUid("recent", uid);
        Date currentDate = new Date();
        Timestamp timestamp = new Timestamp(currentDate.getTime());
        int i = collectionToChecklistMapper.updateTime(listcollection.getColid(), cid, timestamp);
        return Result.ok(returnEmpty);
    }

    @Override
    public Result putFavor(Integer cid, Integer uid) {
        Listcollection listcollection = listcollectionMapper.selectByTypeAndUid("favor", uid);
        Date currentDate = new Date();
        Timestamp timestamp = new Timestamp(currentDate.getTime());
        int i = collectionToChecklistMapper.updateTime(listcollection.getColid(), cid, timestamp);
        return Result.ok(returnEmpty);
    }

    @Override
    public Result deleteFavor(Integer cid, Integer uid) {
        Listcollection listcollection = listcollectionMapper.selectByTypeAndUid("favor", uid);
        int i = collectionToChecklistMapper.deleteByCidAndUid(listcollection.getColid(), cid);
        return Result.ok(returnEmpty);
    }

    @Override
    public Result putTeam(Integer cid, Integer uid) {
        Listcollection listcollection = listcollectionMapper.selectByTypeAndUid("team", uid);
        Date currentDate = new Date();
        Timestamp timestamp = new Timestamp(currentDate.getTime());
        int i = collectionToChecklistMapper.updateTime(listcollection.getColid(), cid, timestamp);
        return Result.ok(returnEmpty);
    }

    @Override
    public Result deleteTeam(Integer cid, Integer uid) {
        Listcollection listcollection = listcollectionMapper.selectByTypeAndUid("team", uid);
        int i = collectionToChecklistMapper.deleteByCidAndUid(listcollection.getColid(), cid);
        return Result.ok(returnEmpty);
    }

    @Override
    public Result searchFavor(Integer cid, Integer uid) {
        Listcollection listcollection = listcollectionMapper.selectByTypeAndUid("favor", uid);
        Date currentDate = new Date();
        Timestamp timestamp = new Timestamp(currentDate.getTime());
        CollectionToChecklist collectionToChecklist = collectionToChecklistMapper.selectByColidAndCid(listcollection.getColid(), cid);
        boolean b = collectionToChecklist != null;
        return Result.ok(b);
    }
}




