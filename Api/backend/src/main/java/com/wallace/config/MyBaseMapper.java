package com.wallace.config;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * ClassName: MyBaseMapper
 * Package: com.wallace.config
 * Description: 自建BaseMapper
 *
 * @Author yajuxi
 */
public interface MyBaseMapper<T> extends BaseMapper<T> {

    // 批量插入
    int insertBatchSomeColumn(@Param("list") List<T> batchList);

}