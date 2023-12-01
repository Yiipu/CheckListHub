package com.wallace;

import com.baomidou.mybatisplus.annotation.DbType;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.BlockAttackInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import com.wallace.config.InsertBatchSqlInjector;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

/**
 * ClassName: Main
 * Package: com.wallace
 * Description: Spring启动类
 *
 * @Author yajuxi
 */
@SpringBootApplication
@MapperScan("com.wallace.mapper")
public class Main {

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }

    //配置mybatis-plus插件
    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor(DbType.MYSQL)); //分页
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());  //乐观锁
        interceptor.addInnerInterceptor(new BlockAttackInnerInterceptor());  //防全局修改和删除
        return interceptor;
    }

    /*
     * @Author yajuxi
     * @Description 自定义批量注入器
     * @Param []
     * @return com.wallace.config.InsertBatchSqlInjector
     **/
    @Bean
    public InsertBatchSqlInjector insertBatchSqlInjector() {
        return new InsertBatchSqlInjector();
    }

}

