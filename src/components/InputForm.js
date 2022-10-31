import React, { useState } from "react";
import { navigate, useNavigate } from "react-router-dom";
// import { Nav } from "./Nav";
import "./InputForm.css";
import { v4 as uuidv4 } from "uuid";

export const InputForm = (props) => {
  const [show, setShow] = useState(true); //code for deployment
  const [hide, setHide] = useState(true); //code for Demonset
  const [deploymentValid, setDeploymentValid] = useState(false); //code for checking validity
  const [demonValid, setDemonValid] = useState(false); //code for checking validity

  const navigate = useNavigate();

  // Start Code for deployment
  const [inputFields, setInputFields] = useState([
    {
      id: uuidv4(),
      deployment: "Deployment",
      minPods: "1",
      maxPods: "",
      minRam: "1",
      minRamUnit: "MiB",
      maxRam: "",
      maxRamUnit: "MiB",
      minVcpu: "1",
      maxVcpu: "",
      storageUnit: "GiB",
      storage: "",
    },
  ]);

  const checkValidations = () => {
    inputFields.map((i) => {
      if (
        i.minPods > i.maxPods ||
        i.minRam > i.maxRam ||
        i.minVcpu > i.maxVcpu
      ) {
        if (i.maxPods !== "" || i.maxRam !== "" || i.maxVcpu !== "") {
          alert("max value must be greater than min value in Deployment");
        } else {
          setDeploymentValid(true);
        }
      }

      return i;
    });
    demonsetInputFields.map((i) => {
      if (i.demonMinRam > i.demonMaxRam || i.demonMinVcpu > i.demonMaxVcpu) {
        if (i.demonMaxRam !== "" || i.demonMaxVcpu !== "") {
          alert("max value must be greater than min value in Demonset");
        } else {
          setDemonValid(true);
        }
      }
      return i;
    });
  };

  const handleReset = (id) => {
    const values = [...inputFields];
    const containerId = values.findIndex((value) => value.id === id);
    values[containerId] = [
      {
        id: uuidv4(),
        deployment: "Deployment",
        minPods: "1",
        maxPods: "",
        minRam: "1",
        minRamUnit: "MiB",
        maxRam: "",
        maxRamUnit: "MiB",
        minVcpu: "1",
        maxVcpu: "",
        storageUnit: "GiB",
        storage: "",
      },
    ];
    setInputFields(values);
  };

  const refreshPage = (e) => {
    window.location.reload(false);
  };

  const handleChangeInput = (id, event) => {
    const newInputFields = inputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setInputFields(newInputFields);
  };

  const handleAddFields = () => {
    setInputFields([
      ...inputFields,
      {
        id: uuidv4(),
        deployment: "Deployment",
        minPods: "1",
        maxPods: "",
        minRam: "1",
        minRamUnit: "MiB",
        maxRam: "",
        maxRamUnit: "MiB",
        minVcpu: "1",
        maxVcpu: "",
        storageUnit: "GiB",
        storage: "",
      },
    ]);
  };

  const handleRemoveFields = (id) => {
    const values = [...inputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputFields(values);
  };

  // End of the deployment functions code

  // Start of the demonset functions code

  const [demonsetInputFields, setDemonsetInputFields] = useState([
    {
      id: uuidv4(),
      demonset: "Demonset",
      demonMinRam: "1",
      demonMinRamUnit: "MiB",
      demonMaxRam: "",
      demonMaxRamUnit: "MiB",
      demonMinVcpu: "1",
      demonMaxVcpu: "",
      demonStorageUnit: "GiB",
      demonStorage: "",
    },
  ]);

  const handleDemonReset = (id) => {
    const demonvalues = [...demonsetInputFields];
    const containerId = demonvalues.findIndex((value) => value.id === id);
    demonvalues[containerId] = [
      {
        id: uuidv4(),
        demonset: "Demonset",
        demonMinRam: "1",
        demonMinRamUnit: "MiB",
        demonMaxRam: "",
        demonMaxRamUnit: "MiB",
        demonMinVcpu: "1",
        demonMaxVcpu: "",
        demonStorageUnit: "GiB",
        demonStorage: "",
      },
    ];
    setDemonsetInputFields(demonvalues);
  };

  const handleChangeDemonInput = (id, event) => {
    const newInputFields = demonsetInputFields.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });

    setDemonsetInputFields(newInputFields);
  };

  const handleAddDemonsetFields = () => {
    setDemonsetInputFields([
      ...demonsetInputFields,
      {
        id: uuidv4(),
        demonset: "Demonset",
        demonMinRam: "1",
        demonMinRamUnit: "MiB",
        demonMaxRam: "",
        demonMaxRamUnit: "MiB",
        demonMinVcpu: "1",
        demonMaxVcpu: "",
        demonStorageUnit: "GiB",
        demonStorage: "",
      },
    ]);
  };

  const handleDemonRemoveFields = (id) => {
    const values = [...demonsetInputFields];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setDemonsetInputFields(values);
  };
  //end of function code for Demonset

  const handleSubmit = (e) => {
    e.preventDefault();
    // checkValidations();
    // if (deploymentValid && demonValid) {
    // console.log("DepoymentInputFields", inputFields);
    // console.log("DemonsetInputFields", demonsetInputFields);

    props.ondataSubmit(inputFields, demonsetInputFields);
    navigate("/second");
    // props.ondataSubmit(demonsetInputFields);
    // }
  };

  return (
    <div className="main">
      {/* code Starting of Deployment Button */}
      <div>
        <button type="button" className="btn btn-secondary" onClick={() => setShow(!show)}>Deployments </button>
        <button type="button" className="btn btn-secondary" onClick={handleAddFields}>Add Deployment</button>
      </div>
      {/* End of Deployment Button */}

      {/* code started of form */}
      <center>
        <form method="POST" onSubmit={handleSubmit} className="form">
          {/* code of show and hide deployments + code of deplyment container */}
          {show ? (
            <div>
              {inputFields.map((inputField) => (
                <div key={inputField.id} className="incontainer">
                  <div className="box">
                    {/* <div className="detailform"> */}
                    <input type="text" id="deploytxt" placeholder='  Deployment1'
                      name="deployment"
                      value={inputField.deployment}
                      onChange={(event) =>
                        handleChangeInput(inputField.id, event)
                      }
                      required
                    />
                    {/* </div> */}

                    <button type="button" className="btn btn-danger btn-sm" id="delbtn"
                          disabled={inputFields.length === 1}
                          onClick={() => handleRemoveFields(inputField.id)}
                        >Delete</button>

                    <div className="pod">
                      <div className="lpod">


                        <label>* Min PODs </label>
                        <input
                          type="number"
                          className="text"
                          placeholder="1"
                          name="minPods"
                          value={inputField.minPods}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                          min="1"
                          required
                        />
                      </div>
                      {/* </div> */}

                      <div className="rpod">
                        <label htmlFor="name">Max PODs</label>
                        <input type="number" className="text"
                          name="maxPods"
                          value={inputField.maxPods}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                          min="2"
                        />
                      </div>
                    </div>

                    <div className="ram">
                      <div className="lram">
                        <label htmlFor="name">* Min Ram</label>
                        <input type="number" className="text" placeholder="1"
                          min="1"
                          name="minRam"
                          value={inputField.minRam}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                          required
                        />
                        <select name="minRamUnit"
                          id="unit"
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }>
                          <option value="MiB">MiB</option>
                          <option value="GiB">GiB</option>
                        </select>
                      </div>

                      <div className="rram">
                        <label htmlFor="name">Max Ram</label>
                        <input type="number" className="text" min="2"
                          name="maxRam"
                          value={inputField.maxRam}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                        />
                        <select name="maxRamUnit"
                          id="unit"
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }>
                          <option value="MiB">MiB</option>
                          <option value="GiB">GiB</option>
                        </select>
                      </div>
                    </div>


                    <div className="cpu">
                      <div className="lcpu">
                        <label htmlFor="name">* Min vCPU</label>
                        <input type="number" className="text" placeholder="1"
                          name="minVcpu"
                          value={inputField.minVcpu}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                          min="1"
                          required
                        />
                      </div>

                      <div className="rcpu">
                        <label htmlFor="name">Max vCPU</label>
                        <input type="number" className="text" name="maxVcpu"
                          value={inputField.maxVcpu}
                          onChange={(event) =>
                            handleChangeInput(inputField.id, event)
                          }
                          min="2"
                        />
                      </div>
                    </div>
                    <div className="storage">
                      <label htmlFor="name">* Storage</label>
                      <input type="number" className="text" placeholder="1"
                        name="storage"
                        value={inputField.storage}
                        onChange={(event) =>
                          handleChangeInput(inputField.id, event)
                        }
                        min="1"
                      />
                      <select name="storageUnit"
                        id="unit"
                        onChange={(event) =>
                          handleChangeInput(inputField.id, event)
                        }>
                        <option value="mb">MiB</option>
                        <option value="gb">Gib</option>
                        <option value="tb">TiB</option>
                      </select>
                    </div>
                    <div className="subbtn">
                      <button
                        type="reset"
                        onClick={() => handleReset(inputField.id)}
                        className="btn btn-secondary"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAddFields}
                      >Done
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : null}
          {/* End of show and hide of deployment code + deployment container */}

          {/* Start of Demonset button code */}

          <div>
            <button
              type="button"
              onClick={() => setHide(!hide)}
              className="btn btn-secondary"
            >
              Demonset
            </button>{" "}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleAddDemonsetFields}
            >
              Demonset +
            </button>
          </div>
          {/* End of Demonset button code */}

          {/* Start of Demonset hide and show + container code */}

          {hide ? (
            <div>
              {demonsetInputFields.map((demonsetInputField) => (
                <div key={demonsetInputField.id} className="incontainer">
                  {/* <div className="row g-3">
                    <div className="detailform">
                      <span>*</span>
                      <input
                        type="text"
                        className="form-control-plaintext"
                        placeholder="Demonset"
                        name="demonset"
                        value={demonsetInputField.demonset}
                        onChange={(event) =>
                          handleChangeDemonInput(demonsetInputField.id, event)
                        }
                      />
                    </div>

                    <div className="closebtn">
                      <button
                        type="button"
                        className="btn btn-outline-primar"
                        disabled={demonsetInputFields.length === 1}
                        onClick={() =>
                          handleDemonRemoveFields(demonsetInputField.id)
                        }
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fillRule="currentColor"
                          className="bi bi-trash"
                          viewBox="0 0 16 16"
                        >
                          <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                          <path
                            fillRule="evenodd"
                            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                          />
                        </svg>
                      </button>
                    </div>

                    <div className="lanetwo">
                      <div className="maininputs">
                        <span>*</span>
                        <label> Min RAM </label>
                        <input
                          type="number"
                          placeholder="1"
                          name="demonMinRam"
                          value={demonsetInputField.demonMinRam}
                          onChange={(event) =>
                            handleChangeDemonInput(demonsetInputField.id, event)
                          }
                          min="1"
                          required="required"
                        />
                      </div>

                      <div className="unit">
                        <select
                          name="demonMinRamUnit"
                          id="unit"
                          onChange={(event) =>
                            handleChangeDemonInput(demonsetInputField.id, event)
                          }
                        >
                          <option value="MiB">MiB</option>
                          <option value="GiB">GiB</option>
                        </select>
                      </div>

                      <div className="max maininputstwo">
                        <label> Max RAM </label>
                        <input
                          type="number"
                          name="demonMaxRam"
                          value={demonsetInputField.demonMaxRam}
                          onChange={(event) =>
                            handleChangeDemonInput(demonsetInputField.id, event)
                          }
                          min="2"
                        />
                      </div>

                      <div className="unittwo">
                        <select
                          name="demonMaxRamUnit"
                          id="unit"
                          onChange={(event) =>
                            handleChangeDemonInput(demonsetInputField.id, event)
                          }
                        >
                          <option value="MiB">MiB</option>
                          <option value="GiB">GiB</option>
                        </select>
                      </div>
                    </div>

                    <div className="lanetwo">
                      <div className="maininputs">
                        <span>*</span>
                        <label> Min vCPU </label>
                        <input
                          type="number"
                          placeholder="1"
                          name="demonMinVcpu"
                          value={demonsetInputField.demonMinVcpu}
                          onChange={(event) =>
                            handleChangeDemonInput(demonsetInputField.id, event)
                          }
                          min="1"
                          required="required"
                        />
                      </div>

                      <div className="maininputstwo ">
                        <label> Max vCPU </label>
                        <input
                          type="number"
                          name="demonMaxVcpu"
                          value={demonsetInputField.demonMaxVcpu}
                          onChange={(event) =>
                            handleChangeDemonInput(demonsetInputField.id, event)
                          }
                          min="2"
                        />
                      </div>
                    </div>

                    <div className="lanetwo">
                      <div className="maininputs">
                        <label> Storage </label>
                        <input
                          type="number"
                          name="demonStorage"
                          value={demonsetInputField.demonStorage}
                          onChange={(event) =>
                            handleChangeDemonInput(demonsetInputField.id, event)
                          }
                          min="1"
                          required="required"
                        />
                      </div>

                      <div className="unit">
                        <select
                          name="demonStorageUnit"
                          id="unit"
                          onChange={(event) =>
                            handleChangeDemonInput(demonsetInputField.id, event)
                          }
                        >
                          <option value="GiB">GiB</option>
                          <option value="TB">TB</option>
                        </select>
                      </div>
                    </div>

                    <div className="reset">
                      <button
                        type="reset"
                        onClick={() => handleDemonReset(demonsetInputField.id)}
                        className="btn btn-outline-primar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fillRule="currentColor"
                          className="bi bi-bootstrap-reboot"
                          viewBox="0 0 16 16"
                        >
                          <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 1 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
                          <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
                        </svg>
                        <br />
                        Reset
                      </button>
                    </div>

                    <div className="reset">
                      <button
                        type="button"
                        className="btn btn-outline-primar"
                        onClick={handleAddDemonsetFields}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          fillRule="currentColor"
                          className="bi bi-check2-circle"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z" />
                          <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z" />
                        </svg>
                        <br />
                        Done
                      </button>
                    </div>
                  </div> */}
                    <div className="box1">
                    {/* <div className="detailform"> */}
                    <input type="text" id="deploytxt" placeholder='  Deployment1'
                      name="deployment"
                      value={demonsetInputField.demonset}
                      onChange={(event) =>
                        handleChangeDemonInput(demonsetInputField.id, event)
                      }
                      required
                    />
                    {/* </div> */}

                    <button type="button" className="btn btn-danger btn-sm" id="delbtn"
                           disabled={demonsetInputFields.length === 1}
                           onClick={() =>
                             handleDemonRemoveFields(demonsetInputField.id)
                           }
                        >Delete</button>


                    <div className="ramds">
                      <div className="lram">
                        <label htmlFor="name">* Min Ram</label>
                        <input type="number" className="text" placeholder="1"
                          min="1"
                          name="minRam"
                          value={demonsetInputField.minRam}
                          onChange={(event) =>
                            handleChangeInput(demonsetInputField.id, event)
                          }
                          required
                        />
                        <select name="minRamUnit"
                          id="unit"
                          onChange={(event) =>
                            handleChangeInput(demonsetInputField.id, event)
                          }>
                          <option value="MiB">MiB</option>
                          <option value="GiB">GiB</option>
                        </select>
                      </div>

                      <div className="rram">
                        <label htmlFor="name">Max Ram</label>
                        <input type="number" className="text" min="2"
                          name="maxRam"
                          value={demonsetInputField.maxRam}
                          onChange={(event) =>
                            handleChangeInput(demonsetInputField.id, event)
                          }
                        />
                        <select name="maxRamUnit"
                          id="unit"
                          onChange={(event) =>
                            handleChangeInput(demonsetInputField.id, event)
                          }>
                          <option value="MiB">MiB</option>
                          <option value="GiB">GiB</option>
                        </select>
                      </div>
                    </div>


                    <div className="cpu">
                      <div className="lcpu">
                        <label htmlFor="name">* Min vCPU</label>
                        <input type="number" className="text" placeholder="1"
                          name="minVcpu"
                          value={demonsetInputField.minVcpu}
                          onChange={(event) =>
                            handleChangeInput(demonsetInputField.id, event)
                          }
                          min="1"
                          required
                        />
                      </div>

                      <div className="rcpu">
                        <label htmlFor="name">Max vCPU</label>
                        <input type="number" className="text" name="maxVcpu"
                          value={demonsetInputField.maxVcpu}
                          onChange={(event) =>
                            handleChangeInput(demonsetInputField.id, event)
                          }
                          min="2"
                        />
                      </div>
                    </div>
                    <div className="storage">
                      <label htmlFor="name">* Storage</label>
                      <input type="number" className="text" placeholder="1"
                        name="storage"
                        value={demonsetInputField.storage}
                        onChange={(event) =>
                          handleChangeInput(demonsetInputField.id, event)
                        }
                        min="1"
                      />
                      <select name="storageUnit"
                        id="unit"
                        onChange={(event) =>
                          handleChangeInput(demonsetInputField.id, event)
                        }>
                        <option value="mb">MiB</option>
                        <option value="gb">Gib</option>
                        <option value="tb">TiB</option>
                      </select>
                    </div>
                    <div className="subbtn">
                      <button
                        type="reset"
                        onClick={() => handleReset(demonsetInputField.id)}
                        className="btn btn-secondary"
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleAddFields}
                      >Done
                      </button>
                    </div>
                  </div>



                </div>
              ))}
            </div>
          ) : null}

          {/* End of Demonset hide and show + container code */}

          {/* Start of clear all  and submit button code*/}
          <div className="submitbtn">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
          {/* End of clear all  and submit button code*/}
        </form>
      </center>
      {/* end of form */}
    </div>
  );
};
