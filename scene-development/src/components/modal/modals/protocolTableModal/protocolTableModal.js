import React, { Component } from "react";
import { connect } from "react-redux";
import FocusLock from "react-focus-lock";

import {
  setPopupTableValue,
  setPopupTableValid,
  setPopupTableSubmitted,
  showModal
} from "actions";

import "./protocolTableModal.scss";

class ProtocolTableModal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormValid: false
    };
  }

  reset = e => {
    for (let i = 1; i < 4; i++) {
      for (let j = 1; j < 6; j++) {
        this.props.setPopupTableValue({
          value: "",
          row: i,
          index: j
        });
      }
    }
    this.props.setPopupTableValid({
      valid: false
    });
  };

  numsOnly = text => {
    return text.replace(/\D/g, "");
  };

  handleChange = (e, row, index) => {
    if (this.numsOnly(e.target.value) !== e.target.value) {
      e.target.setCustomValidity("Please input an integer");
      e.target.reportValidity();
    } else {
      e.target.setCustomValidity("");
    }

    this.props.setPopupTableValue({
      value: this.numsOnly(e.target.value),
      row: row,
      index: index
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.setPopupTableSubmitted({
      submitted: true
    });
    this.props.showModal({
      display: false
    });
  };

  getTopParagraph = () => {
    if (this.props.level === 3) {
      return (
        <p>
          In order to have enough DNA to visualize on the gel, you will need to
          add 4μL of each sample you want to run. The only exception is the gLIG
          tube, which requires 5µl of the LIG sample. You will also need to add
          loading dye and distilled water to your samples to a final volume of
          10µl. The loading dye concentration is 5X and should be 1X in the
          final sample. Please enter the volumes of each reagent needed in each
          sample into the table below.
        </p>
      );
    } else if (this.props.level === 2) {
      return (
        <p>
          In order to have enough DNA to visualize on the gel, you will need to
          add 4μL of each sample you want to run. The only exception is the gLIG
          tube, which requires 5µl of the LIG sample. You will also need to add
          loading dye and distilled water to your samples to a final volume of
          10µl. Each sample will need 2μL of loading dye. Please enter the
          volumes of each reagent needed in each sample into the table below.
        </p>
      );
    } else {
      return (
        <p>
          In order to have enough DNA to visualize on the gel, you will need to
          add 4µl of each sample you want to run and 4µl of distilled water. The
          only exception is the gLIG tube, which requires 5µl of the LIG sample
          and 3µl of distilled water. You will also need to add 2µl of loading
          dye to each sample. Please enter the volumes of each reagent needed in
          each sample into the table below.
        </p>
      );
    }
  };

  render() {
    return (
      <div className="modal-section protocolTable">
        <div className="modal-header">
          <h2 tabIndex={0}>Fill in the Table</h2>
        </div>
        <div className="modal-body" style={{ border: "none" }}>
          <div className="modal-inner">
            <div className="modal-text" tabIndex={0}>{this.getTopParagraph()}</div>

            <form onSubmit={this.handleSubmit} className="protocol-modal-form">
              <table className="protocol-table-modal">
                <colgroup>
                  <col span="1" style={{ backgroundColor: "#668ba6" }} />
                  <col
                    style={{ color: "#FFFFFF", backgroundColor: "#FFFFFF" }}
                  />
                  <col
                    style={{ color: "#FFFFFF", backgroundColor: "#FFFFFF" }}
                  />
                  <col
                    style={{ color: "#FFFFFF", backgroundColor: "#FFFFFF" }}
                  />
                  <col
                    style={{ color: "#FFFFFF", backgroundColor: "#FFFFFF" }}
                  />
                  <col
                    style={{ color: "#FFFFFF", backgroundColor: "#FFFFFF" }}
                  />
                </colgroup>

                <tbody>
                  <tr>
                    <th> Reagents </th>
                    <th> gK- </th>
                    <th> gK+ </th>
                    <th> gA- </th>
                    <th> gA+ </th>
                    <th> gLIG </th>
                  </tr>
                  <tr>
                    <th rowSpan="1">Loading dye (LD)</th>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="loading_dye_gkmin"
                        value={this.props.answers[1][0]}
                        onChange={e => this.handleChange(e, 2, 1)}
                        aria-label="Volume of Loading dye for gK minus. Enter μl."
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="loading_dye_gkplus"
                        value={this.props.answers[1][1]}
                        onChange={e => this.handleChange(e, 2, 2)}
                        aria-label="Volume of Loading dye for gK plus. Enter μl."
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="loading_dye_gamin"
                        value={this.props.answers[1][2]}
                        onChange={e => this.handleChange(e, 2, 3)}
                        aria-label="Volume of Loading dye for gA minus. Enter μl."
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="loading_dye_gaplus"
                        value={this.props.answers[1][3]}
                        onChange={e => this.handleChange(e, 2, 4)}
                        aria-label="Volume of Loading dye for gA plus. Enter μl."
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="loading_dye_glig"
                        value={this.props.answers[1][4]}
                        onChange={e => this.handleChange(e, 2, 5)}
                        aria-label="Volume of Loading dye for gLIG. Enter μl."
                      />
                    </td>
                  </tr>
                  <tr>
                    <th rowSpan="1">Distilled water (dH20)</th>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="distilled_gkmin"
                        // value={this.state.distilled_gkmin}
                        value={this.props.answers[0][0]}
                        onChange={e => this.handleChange(e, 1, 1)}
                        aria-label="Volume of dH2O for gK minus. Enter μl."
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="distilled_gkplus"
                        value={this.props.answers[0][1]}
                        onChange={e => this.handleChange(e, 1, 2)}
                        aria-label="Volume of dH2O for gK plus. Enter μl."
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="distilled_gamin"
                        value={this.props.answers[0][2]}
                        onChange={e => this.handleChange(e, 1, 3)}
                        aria-label="Volume of dH2O for gA minus. Enter μl."
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="distilled_gaplus"
                        value={this.props.answers[0][3]}
                        onChange={e => this.handleChange(e, 1, 4)}
                        aria-label="Volume of dH2O for gA plus. Enter μl."
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="distilled_glig"
                        value={this.props.answers[0][4]}
                        onChange={e => this.handleChange(e, 1, 5)}
                        aria-label="Volume of dH2O for gLIG. Enter μl."
                      />
                    </td>
                  </tr>

                  <tr>
                    <th rowSpan="1">Nondigested pKAN-R (K-)</th>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="nondigested_pkan_r_kmin_gkmin"
                        value={this.props.answers[2][0]}
                        onChange={e => this.handleChange(e, 3, 1)}
                        aria-label="Volume of nondigested pKAN-R for gK minus. Enter μl."
                      />
                    </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <th rowSpan="1">Digested pKAN-R (K+)</th>
                    <td> </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="digested_pkan_r_kplus_gkplus"
                        value={this.props.answers[2][1]}
                        onChange={e => this.handleChange(e, 3, 2)}
                        aria-label="Volume of digested pKAN-R for gK plus. Enter μl."
                      />
                    </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <th rowSpan="1">Nondigested pARA (A-)</th>
                    <td> </td>
                    <td> </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="nondigested_para_amin_gamin"
                        value={this.props.answers[2][2]}
                        onChange={e => this.handleChange(e, 3, 3)}
                        aria-label="Volume of nondigested pARA for gA minus. Enter μl."
                      />
                    </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <th rowSpan="1">Digested pARA (A+)</th>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="digested_para_aplus_gaplus"
                        value={this.props.answers[2][3]}
                        onChange={e => this.handleChange(e, 3, 4)}
                        aria-label="Volume of digested pARA for gA plus. Enter μl."
                      />
                    </td>
                    <td> </td>
                  </tr>
                  <tr>
                    <th rowSpan="1">Ligated plasmids (LIG)</th>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td>
                      <input
                        type="text"
                        placeholder="Enter &micro;l"
                        name="ligated_plasmids_lig_glig"
                        value={this.props.answers[2][4]}
                        onChange={e => this.handleChange(e, 3, 5)}
                        aria-label="Volume of ligated plasmids for gLIG. Enter μl."
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </div>
        </div>

        <div className="modal-footer">
          <button
            aria-label="Reset"
            tabIndex={0}
            className="modal-btn-secondary"
            onClick={this.reset}
          >
            Reset
          </button>

          <button
            aria-label="Submit"
            tabIndex={0}
            className="modal-btn-primary"
            onClick={this.handleSubmit}
            disabled={this.props.valid ? false : true}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    answers: state.protocolTable.answers,
    valid: state.protocolTable.valid,
    level: state.notebook.level
  };
};

export default connect(
  mapStateToProps,
  {
    setPopupTableValue,
    setPopupTableValid,
    setPopupTableSubmitted,
    showModal
  }
)(ProtocolTableModal);
