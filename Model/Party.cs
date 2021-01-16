namespace secretsanta.Model
{
    using System;
    using System.Linq;
    using secretsanta.Exception;

    using System.Collections.Generic;
    class Party
    {

        private string id;
        private Guid guid;
        private List<User> users;
        private IDictionary<Guid, Guid> secretsanta;

        public DateTime deadline;
        public string currency;
        public long budget;

        public Party(DateTime deadline, long budget, string currency) {
            this.guid = new Guid();
            this.deadline = deadline;
            this.budget = budget;
            this.currency = currency;
            this.users = new List<User>();
            this.secretsanta = null;
        }

        public Guid GetGuid() {return this.guid;}
        public void AddUser(User user) {this.users.Add(user);}
        public void DeleteUser(User user) {this.users.Remove(user);}
        public User GetUserById(Guid userId) {return this.users.Find(user => user.GetId() == userId);}
        public User GetUserByName(string userName) {return this.users.Find(user => user.GetName() == userName);}

     
        public void Draw() {
            checkValidUserList();
        }

        private void checkValidUserList(){
            if(users == null || !users.Any()) throw  new EmptyListException();  
        }

    }
}