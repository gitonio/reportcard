pragma solidity ^0.4.2;
import "./School.sol";
contract ReportCard {

    address public student;         //address to remit proceeds to if goal is met
    address teacher;                //address that submits grades
    address parent;                 //address of parent
    uint gpa;                       //gpa acheived
    uint public gpaGoal;            //gpa goal
    bool public submitted;          //has teacher submitted grades

    mapping (address => uint) balances;

    event RewardDisbursement (string rd);

    function ReportCard (address stu) {
        parent = msg.sender;
        student = stu;
    }

    function setGPA(uint _gpa) {
        //todo limit who can set to teacher
        gpa = _gpa;
        submitted = true;
    }

    function setGPAGoal (uint _gpa) {
        //todo limit who can set to parent/owner
       gpaGoal = _gpa;
    }
    function enroll(School school, string name) {
        //todo limit who can set to parent/owner
        school.registerReportCard(this, name);
    }

    function contribute() payable {
        balances[msg.sender] += msg.value;
    }

    function getBalance(address ad) returns (uint ret) {
        //todo limit who can set to contributor
        return balances[ad];
    }
        
    function getReportCardBalance() returns (uint ret) {
        //todo limit who can set to parent/owner/student
        return this.balance;
    }


    function getGPA() returns (uint ret) {
        //todo limit who can set to parent/owner/student
        return gpa;
    }
    function getReward () {
        //todo limit who can set to parent/owner/student
        if ((gpa >= gpaGoal) && (submitted)) {
            if (!student.send( this.balance )) {
                throw;
            }
            RewardDisbursement("Award sent");
            return;
        }
        if ((gpa < gpaGoal) && (submitted)) {
            giveRefund;
            return;
        }
    }

    function giveRefund () {

    }

}