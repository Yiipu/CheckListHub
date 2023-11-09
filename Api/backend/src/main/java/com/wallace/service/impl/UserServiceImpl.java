package com.wallace.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.mapper.ListcollectionMapper;
import com.wallace.pojo.Listcollection;
import com.wallace.pojo.User;
import com.wallace.service.UserService;
import com.wallace.mapper.UserMapper;
import com.wallace.utils.Result;
import jakarta.annotation.Resource;
import org.springframework.stereotype.Service;

/**
 * @author y1693
 * @description 针对表【user】的数据库操作Service实现
 * @createDate 2023-11-03 14:03:34
 */
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
        implements UserService {
    @Resource
    private UserMapper userMapper;

    @Resource
    private ListcollectionMapper listcollectionmapper;

    @Override
    public Result userInit(Integer uid) {
        User user1 = userMapper.selectById(uid);
        if (user1 == null) {
            // 向用户表中添加用户
            User user = new User();
            user.setUid(uid);
            user.setVersion(1);
            user.setIsDeleted(0);
            userMapper.insert(user);

            // 向collection 中初始化用户的recent team favor
            Listcollection listcollection = new Listcollection();
            listcollection.setUid(uid);
            listcollection.setVersion(1);
            listcollection.setIsDeleted(0);
            listcollection.setType("recent");
            listcollectionmapper.insert(listcollection);

            Listcollection listcollection1 = new Listcollection();
            listcollection1.setUid(uid);
            listcollection1.setVersion(1);
            listcollection1.setIsDeleted(0);
            listcollection1.setType("team");
            listcollectionmapper.insert(listcollection1);

            Listcollection listcollection2 = new Listcollection();
            listcollection2.setUid(uid);
            listcollection2.setVersion(1);
            listcollection2.setIsDeleted(0);
            listcollection2.setType("favor");
            listcollectionmapper.insert(listcollection2);
            return Result.ok(null);
        } else {
            return Result.build(null, 404, "用户已存在");
        }


    }
}




