package com.wallace.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.wallace.pojo.User;
import com.wallace.service.UserService;
import com.wallace.mapper.UserMapper;
import org.springframework.stereotype.Service;

/**
* @author y1693
* @description 针对表【user】的数据库操作Service实现
* @createDate 2023-11-03 14:03:34
*/
@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User>
    implements UserService{

}




