package com.wallace.mapper;

import com.wallace.config.MyBaseMapper;
import com.wallace.pojo.Progress;

import java.util.List;
import java.util.Map;

/**
 * @author y1693
 * @description 针对表【progress】的数据库操作Mapper
 * @createDate 2023-11-09 08:57:18
 * @Entity com.wallace.pojo.Progress
 */
public interface ProgressMapper extends MyBaseMapper<Progress> {

    int updateMark(int tid, Integer uid, Integer cid, String mark);

    Progress selectProgress(int tid, Integer uid, Integer cid);

    int CreateTeamProgress(Progress progress);

    int updateTid(Integer tid, Integer id);

    int deleteByTidAndUidAndCid(Integer tid, Integer uid, Integer cid);


    int CreateMark(int tid, Integer uid, Integer cid, String mark);

    Progress selectCidByTid(Integer tid);

    Progress selectTidByUidAndCid(Integer uid, Integer cid);


    List<Map<Object, Object>> selectTidAndCidAndHeaderByUid(Integer uid);
}




