package com.wallace.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.pojo.Progress;
import com.wallace.service.ProgressService;
import com.wallace.mapper.ProgressMapper;
import com.wallace.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * @author y1693
 * @description 针对表【progress】的数据库操作Service实现
 * @createDate 2023-11-09 08:57:18
 */
@Service
public class ProgressServiceImpl extends ServiceImpl<ProgressMapper, Progress>
        implements ProgressService {

    String[] returnEmpty = new String[0];
    @Resource
    private ProgressMapper progressMapper;

    @Override
    public Result updateprogress(int tid, Integer uid, Integer cid, String mark) {
        if (mark != null)
            progressMapper.updateMark(tid, uid, cid, mark);
        else {
            int i = progressMapper.CreateMark(tid, uid, cid, mark);
        }

        return Result.ok(returnEmpty);
    }

    @Override
    public Result CreateTeamProgress(Integer uid, Integer cid) {
        Progress progress = new Progress();
        progress.setUid(uid);
        progress.setCid(cid);
        int i = progressMapper.CreateTeamProgress(progress);
        int j = progressMapper.updateTid(progress.getId(), progress.getId());
        return Result.ok(progress.getId());
    }

    @Override
    public Result QuitTeamProgress(Integer tid, Integer uid, Integer cid) {
        int i = progressMapper.deleteByTidAndUidAndCid(tid, uid, cid);
        return Result.ok(returnEmpty);
    }

    @Override
    public Integer findCidByTid(Integer tid) {
        Progress progress = progressMapper.selectCidByTid(tid);
        return progress.getCid();
    }

    @Override
    public Result addTeamProgress(Integer tid, Integer uid, Integer cid) {

        int i = progressMapper.updateMark(tid, uid, cid, null);
        return Result.ok(returnEmpty);

    }


}



