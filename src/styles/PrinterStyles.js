export const printStyles =
`<style>
	div {
 border-radius: 0px !important;
 box-shadow: none !important; }

	@media print {
	  @page { margin: 0; }
	  body { margin: 0 20px; }
	  img {visibility: hidden; }
	}

</style>`;
