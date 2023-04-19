import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

// import { RuleActions } from "../constant/ruleActionConstant";

import Select from "react-select";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";
const RuleCreateModal = React.memo(
  ({ showModal, handleModalChange, saveRule, existingRule }) => {
    const bundleSelectedForms = useSelector(
      (state) => state.bundle.selectedForms || []
    );
    
    const [criteria, setCriteria] = useState("");
    const [selectedFormDta, setSelectedFormData] = useState("");
    // const [action, setAction] = useState();
    const { t } = useTranslation();

    const FormOptions = useMemo(() => {
      const filteredForms = bundleSelectedForms.filter((i) => !i.rules?.length);
      return filteredForms.map((item) => {
        return {
          label: item.formName,
          value: item.parentFormId, 
        };
      });
    }, [bundleSelectedForms]);

    useEffect(() => {
      setCriteria("");
      // setAction("");
      setSelectedFormData("");
    }, [showModal]);

    useEffect(() => {
      if (existingRule) {
        setSelectedFormData({
          label: existingRule.formName,
          value: existingRule.parentFormId,
        });

        // const action = RuleActions.find(
        //   (action) => action.value === existingRule.action
        // );
        // setAction(action);
        setCriteria(existingRule?.rules ? existingRule?.rules.join(",") : "");
      }
    }, [existingRule]);

    const handleFormSelectChange = (form) => {
      setSelectedFormData(form);
    };

    const submitRule = () => {
      const data = {
        rules: criteria.split(","),
        // action: action.value,
      };
      saveRule(data, selectedFormDta.value);
      setCriteria("");
      // setAction("");
      setSelectedFormData("");
    };

    return (
      <div>
        <Modal show={showModal} size="md">
          <Modal.Header>
            <div className="d-flex justify-content-between align-items-center w-100">
              <h4>{t("Create Condition")}</h4>
              <span style={{ cursor: "pointer" }} onClick={handleModalChange}>
                <i className="fa fa-times" aria-hidden="true"></i>
              </span>
            </div>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>{t("Criteria")}</label>
              <textarea 
                rows={5}
                onChange={(e) => {
                  setCriteria(e.target.value);
                }}
                type="text"
                value={criteria}
                className="form-control"
                placeholder={t("Enter criteria")}
              />

              <div className="select-style mt-2">
                <label>{t("Select Form")}</label>
                <Select
                  value={selectedFormDta}
                  placeholder={t("Select Form")}
                  options={FormOptions}
                  onChange={handleFormSelectChange}
                />
              </div>

              {/* <div className="select-style mt-2">
                <label>Select Action</label>
                <Select
                  placeholder={"Select Action"}
                  options={RuleActions}
                  value={action}
                  onChange={setAction}
                />
              </div> */}
            </div>
          </Modal.Body>
          <Modal.Footer className="justify-content-end">
            <button
              className="btn btn-primary"
              disabled={!selectedFormDta || !criteria}
              onClick={() => {
                submitRule();
              }}
            >
              Submit
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
);
export default RuleCreateModal;
