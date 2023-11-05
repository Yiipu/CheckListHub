package com.wallace.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.pojo.CkList;
import com.wallace.service.CkListService;
import com.wallace.mapper.CkListMapper;
import com.wallace.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author y1693
 * @description 针对表【ck_list】的数据库操作Service实现
 * @createDate 2023-11-03 14:03:34
 */
@Service
public class CkListServiceImpl extends ServiceImpl<CkListMapper, CkList>
        implements CkListService {
    @Resource
    private CkListMapper ckListMapper;
    @Override
    public Result findByCid(Integer cid) {
        CkList ck = ckListMapper.selectById(cid);
        return Result.ok(ck);
    }
}




