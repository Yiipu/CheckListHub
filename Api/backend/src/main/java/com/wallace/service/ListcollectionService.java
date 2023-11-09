package com.wallace.service;

import com.wallace.pojo.Listcollection;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wallace.utils.Result;

/**
* @author y1693
* @description 针对表【listcollection】的数据库操作Service
* @createDate 2023-11-07 23:58:15
*/
public interface ListcollectionService extends IService<Listcollection> {

    Result insertByInit();

    Result findBest();

    Result findFavor(Integer uid);

    Result findRecent(Integer uid);
}
