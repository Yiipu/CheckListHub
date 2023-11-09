package com.wallace.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.mapper.CollectionToChecklistMapper;
import com.wallace.pojo.CkList;
import com.wallace.pojo.CollectionToChecklist;
import com.wallace.pojo.Listcollection;
import com.wallace.service.ListcollectionService;
import com.wallace.mapper.ListcollectionMapper;
import com.wallace.utils.Result;
import com.wallace.utils.ResultCodeEnum;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

/**
 * @author y1693
 * @description 针对表【listcollection】的数据库操作Service实现
 * @createDate 2023-11-07 23:58:15
 */
@Service
public class ListcollectionServiceImpl extends ServiceImpl<ListcollectionMapper, Listcollection>
        implements ListcollectionService {

    @Resource
    private ListcollectionMapper listcollectionMapper;

    @Resource
    private CollectionToChecklistMapper collectionToChecklistMapper;

    @Override
    public Result insertByInit() {
        List<CkList> cklists = new ArrayList<>();
        cklists = listcollectionMapper.selectByUid(1);

        System.out.println("cklists = " + cklists);
        List<CollectionToChecklist> collectionToChecklists = new ArrayList<>();

        for (CkList cklist : cklists) {
            CollectionToChecklist collectionToChecklist = new CollectionToChecklist();
            collectionToChecklist.setCid(cklist.getCid());
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
    public Result findBest() {
        Listcollection best = listcollectionMapper.selectByType("best");
        Integer colid = best.getColid();
        Map<Integer, String> result
                = collectionToChecklistMapper.selectCklistBycolidFromCollectionToChecklist(colid);
        if (!result.isEmpty())
            return Result.ok(result);
        return Result.build(501, ResultCodeEnum.EMPTY);
    }

    @Override
    public Result findFavor(Integer uid) {
        Listcollection best = listcollectionMapper.selectByTypeAndUid("favor",uid);
        Integer colid = best.getColid();
        Map<Integer, String> result
                = collectionToChecklistMapper.selectCklistBycolidFromCollectionToChecklist(colid);
        if (!result.isEmpty())
            return Result.ok(result);
        return Result.ok("收藏为空!");
    }

    @Override
    public Result findRecent(Integer uid) {
        Listcollection best = listcollectionMapper.selectByTypeAndUid("recent",uid);
        Integer colid = best.getColid();
        Map<Integer, String> result
                = collectionToChecklistMapper.selectCklistBycolidFromCollectionToChecklistOrderByTime(colid);
        if (!result.isEmpty())
            return Result.ok(result);
        return Result.ok("最近浏览为空!");
    }
}




