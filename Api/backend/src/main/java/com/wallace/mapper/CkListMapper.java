package com.wallace.mapper;

import com.wallace.config.MyBaseMapper;
import com.wallace.pojo.CkList;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
* @author y1693
* @description 针对表【ck_list】的数据库操作Mapper
* @createDate 2023-11-03 14:03:34
* @Entity com.wallace.pojo.CkList
*/
public interface CkListMapper extends MyBaseMapper<CkList> {


    List<CkList> selectByHeader(String header);
}




