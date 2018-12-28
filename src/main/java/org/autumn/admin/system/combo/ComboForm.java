package org.autumn.admin.system.combo;

import javax.validation.constraints.NotBlank;

import org.autumn.admin.common.BaseForm;

public class ComboForm extends BaseForm {

    /**
     *
     */
    private static final long serialVersionUID = 4229316861208556952L;


    public interface Param {
    }


    @NotBlank(groups = Param.class, message = "{comboForm.names.notBlank}")
    private String names;

    public String getNames() {
        return names;
    }

    public void setNames(String names) {
        this.names = names;
    }

}
