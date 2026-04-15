
import getters from './getters.js';
import mutations from './mutations.js';
import actions from './actions.js';

export default{
    namespaced:true,
    state(){
        return{
           
           coaches:[
                    {
                        id: 'c1',
                        firstName: 'Maximilian',
                        lastName: 'Schwarzmüller',
                        areas: ['frontend', 'backend'],
                        description: "Freelance web developer helping others become developers.",
                        hourlyRate: 30
                    },
                    {
                        id: 'c2',
                        firstName: 'John',
                        lastName: 'Doe',
                        areas: ['frontend'],
                        description: "Frontend specialist with strong UI/UX experience.",
                        hourlyRate: 25
                    },
                    {
                        id: 'c3',
                        firstName: 'Sara',
                        lastName: 'Smith',
                        areas: ['backend'],
                        description: "Backend developer focused on APIs and databases.",
                        hourlyRate: 28
                    },
                    {
                        id: 'c4',
                        firstName: 'Arun',
                        lastName: 'Kumar',
                        areas: ['career', 'frontend'],
                        description: "Helping freshers crack developer jobs.",
                        hourlyRate: 20
                    },
                    {
                        id: 'c5',
                        firstName: 'Priya',
                        lastName: 'Sharma',
                        areas: ['frontend', 'backend'],
                        description: "Full stack developer with 5+ years experience.",
                        hourlyRate: 35
                    },
                    {
                        id: 'c6',
                        firstName: 'David',
                        lastName: 'Lee',
                        areas: ['devops'],
                        description: "DevOps engineer working with CI/CD pipelines.",
                        hourlyRate: 40
                    },
                    {
                        id: 'c7',
                        firstName: 'Kiran',
                        lastName: 'Raj',
                        areas: ['frontend'],
                        description: "Vue and React developer.",
                        hourlyRate: 22
                    },
                    {
                        id: 'c8',
                        firstName: 'Anjali',
                        lastName: 'Verma',
                        areas: ['career'],
                        description: "Career coach for IT students.",
                        hourlyRate: 18
                    },
                    {
                        id: 'c9',
                        firstName: 'Michael',
                        lastName: 'Brown',
                        areas: ['backend', 'devops'],
                        description: "Cloud and backend specialist.",
                        hourlyRate: 45
                    },
                    {
                        id: 'c10',
                        firstName: 'Suresh',
                        lastName: 'Reddy',
                        areas: ['backend'],
                        description: "Node.js expert.",
                        hourlyRate: 26
                    },
                    {
                        id: 'c11',
                        firstName: 'Rahul',
                        lastName: 'Das',
                        areas: ['frontend', 'career'],
                        description: "Frontend mentor and career guide.",
                        hourlyRate: 24
                    },
                    {
                        id: 'c12',
                        firstName: 'Emily',
                        lastName: 'Clark',
                        areas: ['frontend'],
                        description: "UI developer with design skills.",
                        hourlyRate: 27
                    },
                    {
                        id: 'c13',
                        firstName: 'Vikram',
                        lastName: 'Singh',
                        areas: ['backend', 'career'],
                        description: "Backend dev helping interview prep.",
                        hourlyRate: 29
                    },
                    {
                        id: 'c14',
                        firstName: 'Naveen',
                        lastName: 'Kumar',
                        areas: ['devops'],
                        description: "Docker & Kubernetes expert.",
                        hourlyRate: 42
                    },
                    {
                        id: 'c15',
                        firstName: 'Sophia',
                        lastName: 'Taylor',
                        areas: ['frontend', 'backend'],
                        description: "Full stack JS developer.",
                        hourlyRate: 33
                    },
                    {
                        id: 'c16',
                        firstName: 'Ravi',
                        lastName: 'Kiran',
                        areas: ['career'],
                        description: "Guiding students into IT careers.",
                        hourlyRate: 19
                    },
                    {
                        id: 'c17',
                        firstName: 'Daniel',
                        lastName: 'Wilson',
                        areas: ['backend'],
                        description: "Java backend developer.",
                        hourlyRate: 31
                    },
                    {
                        id: 'c18',
                        firstName: 'Meena',
                        lastName: 'Iyer',
                        areas: ['frontend'],
                        description: "Angular developer.",
                        hourlyRate: 23
                    },
                    {
                        id: 'c19',
                        firstName: 'Ajay',
                        lastName: 'Patel',
                        areas: ['backend', 'devops'],
                        description: "Cloud backend engineer.",
                        hourlyRate: 38
                    },
                    {
                        id: 'c20',
                        firstName: 'Chris',
                        lastName: 'Evans',
                        areas: ['frontend'],
                        description: "Modern JS frameworks expert.",
                        hourlyRate: 34
                    },
                    {
                        id: 'c21',
                        firstName: 'Divya',
                        lastName: 'Nair',
                        areas: ['career', 'frontend'],
                        description: "Helping beginners learn coding.",
                        hourlyRate: 21
                    },
                    {
                        id: 'c22',
                        firstName: 'Tom',
                        lastName: 'Holland',
                        areas: ['backend'],
                        description: "API and microservices developer.",
                        hourlyRate: 36
                    },
                    {
                        id: 'c23',
                        firstName: 'Karthik',
                        lastName: 'Raman',
                        areas: ['frontend', 'backend'],
                        description: "Full stack developer.",
                        hourlyRate: 32
                    },
                    {
                        id: 'c24',
                        firstName: 'Neha',
                        lastName: 'Gupta',
                        areas: ['career'],
                        description: "Resume and interview coach.",
                        hourlyRate: 17
                    },
                    {
                        id: 'c25',
                        firstName: 'Leo',
                        lastName: 'Martins',
                        areas: ['devops', 'backend'],
                        description: "Infrastructure and backend expert.",
                        hourlyRate: 44
                    }

                    ],
                }

            },
    getters,
    mutations,
    actions,
            }