const app = Vue.createApp({
    data(){
        return {
            url: 'https://apipetshop.herokuapp.com/api/articulos',
            arrayCompleto: [],
            arrayCompletoBackup: [],
            juguetes: [],
            medicamentos: [],
            backJuguetes: [],
            backMedicamentos: [],
            arrayCarrousel: [],
            palabraBuscada: "",
        }
    },

    created(){
        this.loadData(this.url)
    },

    methods:{
        loadData(url){
            fetch(url).then(res => res.json()
            .then(data =>{
                this.arrayCompleto = data.response
                this.juguetes = this.arrayCompleto.filter(item => item.tipo.includes("Juguete"))
                this.medicamentos = this.arrayCompleto.filter(item => item.tipo.includes("Medicamento"))
                this.arrayCompletoBackup = this.arrayCompleto
                this.backJuguetes = this.juguetes
                this.backMedicamentos = this.medicamentos
                this.arrayCarrousel = this.arrayCompleto.sort((a, b)=> a.stock - b.stock)
                console.log(this.arrayCarrousel);
            })
            )
        },
    },
    computed:{
        filtroInputJuguetes(){
            this.juguetes = this.backJuguetes.filter(juguete => juguete.nombre.toLowerCase().includes(this.palabraBuscada.toLowerCase()))
        },
        filtroInputMedicamentos(){
            this.medicamentos = this.backMedicamentos.filter(medicina => medicina.nombre.toLowerCase().includes(this.palabraBuscada.toLowerCase()))
        }
    },

}).mount('#app')