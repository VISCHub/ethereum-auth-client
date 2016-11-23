/** 
* The MIT License (MIT) 
*  
* Copyright (c) 2016 Auth0, Inc. <support@auth0.com> (http://auth0.com) 
*  
* Permission is hereby granted, free of charge, to any person obtaining a copy 
* of this software and associated documentation files (the "Software"), to deal 
* in the Software without restriction, including without limitation the rights 
* to use, copy, modify, merge, publish, distribute, sublicense, and/or sell 
* copies of the Software, and to permit persons to whom the Software is 
* furnished to do so, subject to the following conditions: 
*  
* The above copyright notice and this permission notice shall be included in all 
* copies or substantial portions of the Software. 
*  
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR 
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
* LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
* OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
* SOFTWARE. 
*/
'use strict';

const contractInfoFactory = require('../factories/contractInfoFactory.js');

const CONTRACT_ABI = [{"constant":false,"inputs":[{"name":"authenticationKey","type":"address"}],"name":"register","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newAuthenticationKey","type":"address"}],"name":"changeAuthenticationKey","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"keyEntries","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"keysInUse","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"owner","type":"address"},{"indexed":false,"name":"keyEntryAddress","type":"address"}],"name":"Registration","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"code","type":"uint256"},{"indexed":false,"name":"owner","type":"address"}],"name":"Error","type":"event"}];

const COMPILED_CONTRACT = '6060604052610a45806100126000396000f360606040526000357c0100000000000000000000000000000000000000000000000000000000900480634420e4861461005d5780635d0c72eb1461007a5780638ebb26e514610097578063e6719313146100de57610058565b610002565b34610002576100786004808035906020019091905050610111565b005b346100025761009560048080359060200190919050506103e8565b005b34610002576100b26004808035906020019091905050610689565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576100f960048080359060200190919050506106c1565b60405180821515815260200191505060405180910390f35b60006000600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1614156103885781600160005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151561032657823360405161035f806106e6833901808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050604051809103906000f0801561000257915081600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055506001600160005060008573ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055507f2a4f530ae55f002aac4686b649762fc68e96bd8b80ac835b41777145c94e1f8a3383604051808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a15b610381565b7faf51d07acb94ab3953cee4d32a199aa0f72cba22f1fbfd2c5137901e160b5446600133604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1610002565b5b506103e3565b7faf51d07acb94ab3953cee4d32a199aa0f72cba22f1fbfd2c5137901e160b5446600033604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1610002565b5b5050565b6000600082600160005060008273ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900460ff16151561062757600060005060003373ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1692508273ffffffffffffffffffffffffffffffffffffffff1663c43dc766600060405160200152604051817c0100000000000000000000000000000000000000000000000000000000028152600401809050602060405180830381600087803b156100025760325a03f115610002575050506040518051906020015091508273ffffffffffffffffffffffffffffffffffffffff1663aa7cddfe8533604051837c0100000000000000000000000000000000000000000000000000000000028152600401808373ffffffffffffffffffffffffffffffffffffffff1681526020018273ffffffffffffffffffffffffffffffffffffffff16815260200192505050600060405180830381600087803b156100025760325a03f115610002575050506000600160005060008473ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055506001600160005060008673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060006101000a81548160ff021916908302179055505b610682565b7faf51d07acb94ab3953cee4d32a199aa0f72cba22f1fbfd2c5137901e160b5446600133604051808381526020018273ffffffffffffffffffffffffffffffffffffffff1681526020019250505060405180910390a1610002565b5b50505050565b600060005060205280600052604060002060009150909054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160005060205280600052604060002060009150909054906101000a900460ff168156606060405260405160408061035f833981016040528080519060200190919080519060200190919050505b33600060006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555080600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff0219169083021790555081600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b50506102a3806100bc6000396000f360606040526000357c01000000000000000000000000000000000000000000000000000000009004806302d05d3f1461005d5780638da5cb5b1461009b578063aa7cddfe146100d9578063c43dc766146100ff57610058565b610002565b346100025761006f600480505061013d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576100ad6004805050610163565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34610002576100fd6004808035906020019091908035906020019091905050610189565b005b3461000257610111600480505061027d565b604051808273ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b80600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16141561027257600060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff163373ffffffffffffffffffffffffffffffffffffffff1614156102675782600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908302179055505b61026c565b610002565b5b610277565b610002565b5b505050565b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff168156';

module.exports =  contractInfoFactory.createContractInfo(CONTRACT_ABI, COMPILED_CONTRACT);

