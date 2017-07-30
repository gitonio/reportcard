pragma solidity ^0.4.2;
import "./ReportCard.sol";
contract School  {
    ReportCard rc;
    bytes32 public schoolName ;

   event GradesSubmitted(string gs );

    //todo change to array of teachers
    address public teacher;

    mapping(address => uint) reportCard;
    
    function School (bytes32 name) {
        schoolName = name;
    }
    
    struct ReportCardStruct {
        address studentReportCard;                         //address of student 
        mapping(string => uint) subjectGradeMapping;       //grades  of student
        string[] subjectList;
        string studentName;
    }

    ReportCardStruct[] reportCards;
    ReportCardStruct emptyReportCard;
   

    function registerReportCard(address rca, string name) {
        uint nl = reportCards.push(emptyReportCard);
        reportCards[nl-1].studentReportCard = rca;
        reportCards[nl-1].studentName = name;
        reportCard[rca] = nl -1;
 
    }

    function getNumberOfReportCards() returns (uint ret)  {
        return (reportCards.length);
    }    
    
     function enterGrades(address rca, string subject, uint _grade) {
            if (reportCards[reportCard[rca]].subjectGradeMapping[subject] == 0) {
                reportCards[reportCard[rca]].subjectList.push(subject);
            }
            reportCards[reportCard[rca]].subjectGradeMapping[subject] = _grade;
    }

    function submitReportCard(ReportCard rca) {
        
        GradesSubmitted("GradesSubmitted");
        rca.setGPA(calculateGPA(rca));

    }

    function calculateGPA(address rca) returns (uint ret) {
        string memory subject;
        uint grade;
        uint score;
        uint noof = reportCards[reportCard[rca]].subjectList.length;
        uint gpa;

          for(uint i=0;i<noof-1;i++){
                subject= reportCards[reportCard[rca]].subjectList[i];
                grade = reportCards[reportCard[rca]].subjectGradeMapping[subject];
                score += grade * 100;
          }
          gpa = score;
        return (gpa);
    }

    function listGrade(address student, string subject ) returns (uint ret) {
        return uint(reportCards[reportCard[student]].subjectGradeMapping[subject]);
    }

    function getNumberOfGrades(address student) returns (uint ret) {
        return reportCards[reportCard[student]].subjectList.length;
    }

    function setTeacher(address ta){
        teacher = ta;
    }

    function getSchoolName() constant returns (bytes32) {
        return schoolName;
    }

    function getStudentNumber(address student) returns(uint) {
        return reportCard[student];
    }

    function getStudentName(address student) returns(string){
        return reportCards[reportCard[student]].studentName;
    }

    function getStudentName(uint number) returns(string){
        return reportCards[number].studentName;
    }
    
}