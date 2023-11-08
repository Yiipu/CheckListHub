package com.wallace.pojo;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import lombok.Data;

/**
 * @TableName collection_to_checklist
 */
@TableName(value ="collection_to_checklist")
@Data
public class CollectionToChecklist implements Serializable {
    private Integer id;

    private Integer colid;

    private Integer cid;

    private Timestamp viewTime;

    private Integer version;

    private Integer isDeleted;

    private static final long serialVersionUID = 1L;

    private  CkList ckList;
}