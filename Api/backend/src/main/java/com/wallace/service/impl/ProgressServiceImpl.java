package com.wallace.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.pojo.Progress;
import com.wallace.service.ProgressService;
import com.wallace.mapper.ProgressMapper;
import com.wallace.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

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
        if (mark != null && !mark.equals("[]")) {
            if (tid == 0)
                progressMapper.updatePersonalMark(tid, uid, cid, mark);
            else
                progressMapper.updateMark(tid, cid, mark);
        } else {
            int i = progressMapper.CreateMark(tid, uid, cid, "[]");
        }

        return Result.ok(returnEmpty);
    }

    @Override
    public Result CreateTeamProgress(Integer uid, Integer cid) {
        Progress progress1 = progressMapper.selectTidByUidAndCid(uid, cid);
        if (progress1 == null) {
            Progress progress = new Progress();
            progress.setUid(uid);
            progress.setCid(cid);

            int i = progressMapper.CreateTeamProgress(progress);
            int j = progressMapper.updateTid(progress.getId(), progress.getId());
            return Result.ok(progress.getId());
        } else {
            return Result.ok(progress1.getId());
        }
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
        Progress progress = progressMapper.selectCidByTid(tid);

        int i = progressMapper.updateMark(tid, uid, progress.getMark());
        return Result.ok(returnEmpty);

    }

    @Override
    public Result findTeamExist(Integer uid, Integer cid) {
        Progress progress = progressMapper.selectTidByUidAndCid(uid, cid);
        if (progress == null)
            return Result.ok(-1);
        return Result.ok(progress.getTid());
    }

    @Override
    public Result getTeamCollection(Integer uid) {
        List<Map<Object, Object>> result
                = progressMapper.selectTidAndCidAndHeaderByUid(uid);
        if (!result.isEmpty())
            return Result.ok(result);
        return Result.ok(returnEmpty);

    }


}




