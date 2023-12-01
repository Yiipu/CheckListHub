package com.wallace.pojo;

import com.baomidou.mybatisplus.annotation.*;

import java.io.Serializable;
import lombok.Data;

/**
 * @TableName listcollection
 */
@TableName(value ="listcollection")
@Data
public class Listcollection implements Serializable {
    @TableId
    private Integer colid;

    private Integer uid;

    private String type;

    @Version
    private Integer version;
    @TableLogic
    private Integer isDeleted;

    private static final long serialVersionUID = 1L;
}