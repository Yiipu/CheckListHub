package com.wallace.mapper;

import com.wallace.config.MyBaseMapper;
import com.wallace.pojo.CkList;
import com.wallace.pojo.Listcollection;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
* @author y1693
* @description 针对表【listcollection】的数据库操作Mapper
* @createDate 2023-11-07 23:58:15
* @Entity com.wallace.pojo.Listcollection
*/
public interface ListcollectionMapper extends MyBaseMapper<Listcollection> {

    List<CkList> selectByUid(int i);
}




