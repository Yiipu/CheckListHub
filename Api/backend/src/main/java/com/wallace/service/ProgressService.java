package com.wallace.service;

import com.wallace.pojo.Progress;
import com.baomidou.mybatisplus.extension.service.IService;
import com.wallace.utils.Result;

/**
* @author y1693
* @description 针对表【progress】的数据库操作Service
* @createDate 2023-11-09 08:57:18
*/
public interface ProgressService extends IService<Progress> {

    Result updateprogress(int tid, Integer uid, Integer cid, String mark);

    Result CreateTeamProgress(Integer uid, Integer cid);

    Result QuitTeamProgress(Integer tid, Integer uid, Integer cid);


    Integer findCidByTid(Integer tid);

    Result addTeamProgress(Integer tid, Integer uid, Integer cid);

    Result findTeamExist(Integer uid, Integer cid);
}
