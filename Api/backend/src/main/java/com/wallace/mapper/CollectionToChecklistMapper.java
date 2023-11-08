package com.wallace.mapper;

import com.wallace.config.MyBaseMapper;
import com.wallace.pojo.CkList;
import com.wallace.pojo.CollectionToChecklist;
import org.apache.ibatis.annotations.MapKey;

import java.util.List;
import java.util.Map;

/**
* @author y1693
* @description 针对表【collection_to_checklist】的数据库操作Mapper
* @createDate 2023-11-07 23:52:24
* @Entity com.wallace.pojo.CollectionToChecklist
*/
public interface CollectionToChecklistMapper extends MyBaseMapper<CollectionToChecklist> {
    @MapKey("cid")
    Map<Integer, String> selectCklistByUidFromCollectionToChecklist(int i);
}




