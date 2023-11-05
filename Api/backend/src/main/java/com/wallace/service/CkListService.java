package com.wallace.service;

import com.wallace.pojo.CkList;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wallace.utils.Result;

/**
* @author y1693
* @description 针对表【ck_list】的数据库操作Service
* @createDate 2023-11-03 14:03:34
*/
public interface CkListService extends IService<CkList> {
    /* 根据cklistid查询cklist
    * */
     Result findByCid(Integer cid);
}
