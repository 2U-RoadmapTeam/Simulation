import React, { Component } from "react";

import "./Context.scss";


const videoLink = "https://www.youtube.com/embed/reYwbnuhFU0";

class Context extends Component {
  	render() {
    	return (
      		<div className="Context">
        		<div>
            	<p className="description" tabIndex={0}>
				Protein gel electrophoresis is a laboratory technique that separates proteins by mass. This technique is similar to running an agarose gel to separate and visualize different molecules of DNA. In contrast to DNA, protein samples are first boiled in a sample buffer containing SDS, which unfolds polypeptides and covers them with negative charges. After boiling, the samples are loaded on a polyacrylamide gel. An applied electrical current lets smaller proteins migrate further down the sieve-like gel and separates them from larger ones.
  						</p>

						  <p className="description" tabIndex={0} > After electrophoresis, the otherwise invisible proteins are typically visualized by staining the gel with Coomassie, which generates the typical protein gel pattern of blue bands. However, when running a sample with many proteins, such as an entire cellular extract, the visualization of individual proteins can be very tricky as hundreds or thousands of other proteins may obscure the protein band you are interested in.</p>


						<p className="description" tabIndex={0} >In this case, Western blotting is employed, a common technique which allows for the specific detection of just one protein among many with the help of a specific antibody. Western blotting is a routine technique to test the protein expression of specific genes in the cell.</p>
  						<p className="description" tabIndex={0}>When you're ready, click the Next button to continue </p>
        		</div>
      		</div>
    	);
  	}
}

export default Context;
