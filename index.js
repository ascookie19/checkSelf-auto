const request = require('request');

const schoolCode = 'N100000176';
const Tokenurl = 'https://eduro.cne.go.kr/stv_cvd_co00_012.do';
const url = 'https://eduro.cne.go.kr/stv_cvd_co01_000.do';
const lasturl = 'https://eduro.cne.go.kr/stv_cvd_co02_000.do';

module.exports = {
	func: (Name, Birth) => {
		const UserOption = {
			method: 'POST',
			url: Tokenurl,
			form: {
				qstnCrtfcNoEncpt: '',
				rtnRsltCode: '',
				schulCode: schoolCode,
				schulNm: '서령고등학교',
				pName: Name,
				frnoRidno: Birth,
				aditCrtfcNo: '',
			}
		}

		request.post(UserOption, function (error, response, body) {
		
			if(error) console.log(error);
			else {
				const schoolKey = JSON.parse(body).resultSVO.qstnCrtfcNoEncpt;
				const option = {
					method: 'POST',
					url: url,
					form: {
						rtnRsltCode: 'SUCCESS',
						qstnCrtfcNoEncpt: schoolKey,
						schulNm: '',
						stdntName: '',
						rspns01: '1',
						rspns02: '1',
						rspns07: '0',
						rspns08: '0',
						rspns09: '0'
					},
				}
				request.post(option, function (error, response, body) {
					if(error) console.log(error);
					else {
						const JSON_Parse = JSON.parse(body);
						const lastoption = {
							method: 'POST',
							url: lasturl,
							form: {
								rtnRsltCode: 'SUCCESS',
								qstnCrtfcNoEncpt: schoolKey,
								schulNm: JSON_Parse.resultSVO.schulNm,
								stdntName: JSON_Parse.resultSVO.stdntName,
								rspns01: '1',
								rspns02: '1',
								rspns07: '0',
								rspns08: '0',
								rspns09: '0' 
							},
						}
		
						request.post(lastoption, function (error, response, body) {
							if(error) console.log(error); //에러가 발생할 경우 에러를 출력
							else {
								// console.log(body);
								console.log(`Name: ${Name} Birth: ${Birth} 연동끝`);
							}
						});
					}
				});
			}
		});
	}
}
