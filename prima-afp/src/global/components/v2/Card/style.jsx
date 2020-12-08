import styled from 'styled-components';

import { allColors } from 'global/styles/index';

export const Content = styled.div`
	padding: 20px;
`;

export const Title = styled.div`
	padding-bottom: 30px;
`;

export const BoxOptions = styled.div`
	position: relative;
	height: 32px;
	display: inline-block;
	padding-right: 20px;
	align-items: center;
	zoom: 1;
	& > img {
		width: 32px;
		height: 32px;
	}
	:hover ul {
		visibility: visible;
		opacity: 1;
	}
	& > ul {
		visibility: hidden;
		opacity: 0;
		position: absolute;
		top: 100%;
		left: -70px;
		right: 0;
		border-radius: 6px;
		-webkit-transition-property: opacity, padding, visibility;
		-moz-transition-property: opacity, padding, visibility;
		-ms-transition-property: opacity, padding, visibility;
		-o-transition-property: opacity, padding, visibility;
		transition-property: opacity, padding, visibility;
		-webkit-transition: 0.2s ease-out;
		-moz-transition: 0.2s ease-out;
		-ms-transition: 0.2s ease-out;
		-o-transition: 0.2s ease-out;
		transition: 0.2s ease-out;
		background-color: ${allColors.colorWhiteBase};
		padding: 20px;
		width: 180px;
	}
	& > ul > li:first-child {
		padding-bottom: 25px;
	}

	& > ul > li > div {
		display: grid;
		grid-template-columns: 20px auto;
		grid-template-rows: auto auto;
		grid-column-gap: 20px;
		justify-items: start;
		align-items: center;
		cursor: pointer;
	}

	& > li > div > span {
		display: block;
		position: relative;
		margin: 0 -13px;
		padding: 0 20px 0 12px;
	}

	& > li > div > span:hover:after {
		display: block;
	}

	& > li > div > span:after {
		display: none;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 50%;
		right: 5px;
		margin-top: -4px;
	}
`;
