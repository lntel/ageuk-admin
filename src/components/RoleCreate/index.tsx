import React, { FC, useContext, useEffect, useState } from "react";
import CanvasDraw from "react-canvas-draw";
import { MdAddCircle, MdRemoveCircle } from "react-icons/md";
import ReactModal from "react-modal";
import { toast } from "react-toastify";
import ReactTooltip from "react-tooltip";
import { AuthContext } from "../../context/AuthContext";
import { MultiModalContext } from "../../context/MultiModalContext";
import { RoleContext } from "../../context/RoleContext";
import { PermissionTypeEnum } from "../../enums/permissions";
import request from "../../helpers/request";
import Checkbox from "../Checkbox";
import Dropdown, { IDropdownOption } from "../Dropdown";
import Form from "../Form";
import MultiModal from "../MultiModal";
import Textbox from "../Textbox";

export interface RoleCreateProps {
  visible: boolean;
  onClose: () => void;
  onCreated: () => void;
}

export interface GeneralDataProps {
  onSubmitted: (e: React.FormEvent<HTMLFormElement>) => void;
}

const GeneralData: FC<GeneralDataProps> = ({ onSubmitted }) => {

  const { state } = useContext(RoleContext);

  const [name, setName] = useState<string>(state.selectedRole?.name || "");
  const [permissions, setPermissions] = useState<PermissionTypeEnum[]>(state.selectedRole?.permissions || []);

  const { setState } = useContext(MultiModalContext);

  useEffect(() => {
    setState({
      name,
      permissions
    });
  }, [name, permissions]);

  const togglePermission = (permission: PermissionTypeEnum) => {

    if(permissions.find(p => p === permission)) {
      setPermissions([
        ...permissions.filter(p => p !== permission)
      ]);
    } else {
      setPermissions([
        ...permissions,
        permission
      ]);
    }
  }

  return (
    <Form onSubmit={onSubmitted} className="roles-component__form">
      <Textbox
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter a role name"
        className="roles-component__input"
      />
      <div className="roles-component__form__permissions">
        <Checkbox
          checked={permissions.indexOf(PermissionTypeEnum.MANAGE_PATIENTS) >= 0}
          onClick={() => togglePermission(PermissionTypeEnum.MANAGE_PATIENTS)}
          text="Manage Patients"
          className="roles-component__form__checkbox"
        />
        <Checkbox
          checked={permissions.indexOf(PermissionTypeEnum.MANAGE_STAFF) >= 0}
          onClick={() => togglePermission(PermissionTypeEnum.MANAGE_STAFF)}
          text="Manage Staff"
          className="roles-component__form__checkbox"
        />
        {/* <Checkbox
          checked={permission}
          onClick={() => setPermission(!permission)}
          text="Super User"
          tooltip="Warning: Checking this box will give this role all permissions available"
          className="roles-component__form__checkbox"
        /> */}
      </div>
      <button type="submit" className="roles-component__submit">{ state.mode === "UPDATE" ? "Update" : "Create"  } role</button>
      <ReactTooltip effect="solid" multiline={true} />
    </Form>
  );
};

const RoleCreate: FC<RoleCreateProps> = ({ visible, onClose, onCreated }) => {

  const { state: authState } = useContext(AuthContext);
  const { state, dispatch } = useContext(RoleContext);
  const { state: modalState } = useContext(MultiModalContext);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    if(state.mode === "CREATE") {
      const response = await request({
        type: "POST",
        url: "/roles",
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        },
        data: modalState
      });
  
      // if(!response.ok) {
      //   if(response.status === 400)
      // }
  
      if(response.ok) {
  
        onCreated();
  
        toast.success("Role has been created");
      }
    } else {
      const response = await request({
        type: "PATCH",
        url: `/roles/${state.selectedRole?.id}`,
        data: modalState,
        headers: {
          Authorization: `Bearer ${authState.accessToken}`
        }
      });

      if(response.ok) {
        onCreated();

        toast.success("Access role has been updated");
      }
    }
  };

  const handleClose = () => {

    dispatch({
      type: "SET_MODE",
      state: {
        ...state,
        mode: "CREATE"
      }
    });

    dispatch({
      type: "SET_SELECTED",
      state: {
        ...state,
        selectedRole: undefined
      }
    });

    onClose();
  }

  return (
    <MultiModal
      onClose={() => handleClose()}
      overlayClassName="roles-component__modal"
      className="roles-component__general"
      pages={[
        {
          header: "Role Information",
          component: <GeneralData onSubmitted={handleCreate} />,
        },
      ]}
      visible={visible}
    />
  );
};

export default RoleCreate;
