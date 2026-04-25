const { createApp } = Vue;

const app = createApp({
    data() {
        let savedUser = {};
        try {
            const data = localStorage.getItem('currentUser');
            savedUser = data ? JSON.parse(data) : {};
        } catch (e) {
            console.error("failed to parse user");
        }
        
        return {
            contacts: [],
            newContact: { id: null, name: '', phone: '' },
            authData: { name: '', email: '', password: '', gender: 'Male', dob: '' },
            isLogged: !!localStorage.getItem('currentUser'),
            user: savedUser,
            errorMessage: ''
        };
    },
    
    computed: {
        groupedContacts() {
            const groups = {};
            
            const sorted = [...this.contacts].sort((a, b) => a.name.localeCompare(b.name));
            
            sorted.forEach(contact => {
                const firstLetter = contact.name.charAt(0).toUpperCase();
                if (!groups[firstLetter]) {
                    groups[firstLetter] = [];
                }
                groups[firstLetter].push(contact);
            });
            
            return groups;
        }
    },

    methods: {
        async fetchContacts() {
            if (!this.isLogged) return;
            try {
                const res = await axios.get('http://localhost:3000/api/contacts');
                this.contacts = res.data;
            } catch (e) { console.error("Server error:", e); }
        },

        async saveContact() {
            try {
                if (this.newContact.id) {
                    await axios.put(`http://localhost:3000/api/contacts/${this.newContact.id}`, this.newContact);
                    const index = this.contacts.findIndex(c => c.id === this.newContact.id);
                    if (index !== -1) {
                        this.contacts[index] = { ...this.newContact };
                    }
                } else {
                    const res = await axios.post('http://localhost:3000/api/contacts', this.newContact);
                    this.contacts.push(res.data);
                }
                this.closeModal();
            } catch (e) { console.error("Save error:", e); }
        },

        async handleLogin() {
            try {
                const res = await axios.get('http://localhost:3000/api/login', {
                    params: { email: this.authData.email, password: this.authData.password }
                });
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                window.location.href = 'index.html';
            } catch (e) {
                this.errorMessage = "Incorrect email or password";
            }
        },

        async handleRegister() {
            try {
                const res = await axios.post('http://localhost:3000/api/register', this.authData);
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                window.location.href = 'index.html';
            } catch (e) {
                this.errorMessage = "Registration error. This email may already exist.";
            }
        },

        logout() {
            localStorage.removeItem('currentUser');
            this.isLogged = false;
            this.contacts = [];
            window.location.href = 'login.html';
        },

        editContact(contact) {
            this.newContact = { ...contact };
            const modalEl = document.getElementById('addContactModal');
            if (modalEl) {
                bootstrap.Modal.getOrCreateInstance(modalEl).show();
            }
        },

        async deleteContact(id) {
            if (!confirm("Are you sure?")) return;
            try {
                await axios.delete(`http://localhost:3000/api/contacts/${id}`);
                this.contacts = this.contacts.filter(c => c.id !== id);
            } catch (e) { console.error("Delete error:", e); }
        },

        openModal() {
            this.newContact = { id: null, name: '', phone: '' };
            const modalEl = document.getElementById('addContactModal');
            if (modalEl) {
                bootstrap.Modal.getOrCreateInstance(modalEl).show();
            }
        },

        closeModal() {
            const modalEl = document.getElementById('addContactModal');
            if (modalEl) {
                const instance = bootstrap.Modal.getInstance(modalEl);
                if (instance) instance.hide();
            }
        },

        getAvatarColor(name) {
            let hash = 0;
            if (name) {
                for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
            }
            return `hsl(${Math.abs(hash % 360)}, 65%, 55%)`;
        },

        getInitials(name) {
            if (!name) return '?';
            return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
        }
    },
    mounted() {
        if (this.isLogged) {
            this.fetchContacts();
        }
    }
});

app.mount('#app');