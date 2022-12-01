function create() {

    let data = {
        nome: $('#name').val(),
        cpf: $('#cpf').val(),
        cidade: $('#city').val(),
        estado: $('#select-state').val(),
    }

    if (verifyEmpty(data)) {

        Requests.post('cadastros/store', data, function(response) {
            
            if (response.status == 'success') {

                showModal(response.status, response.message);
                setTimeout(() => mainScreen(), 3000);
            } else {

                showModal(response.status, response.message);
            }
        });
    } else {

        showModal('error', 'Por favor, preencha todos os campos.');
    }

}

function update() {

    let data = {
        id: $('#id').val(),
        nome: $('#name').val(),
        cpf: $('#cpf').val(),
        cidade: $('#city').val(),
        estado: $('#select-state').val(),
    }

    if (verifyEmpty(data)) {

        Requests.put('cadastros/update', data, function(response) {
            
            if (response.status == 'success') {

                showModal(response.status, response.message);
                setTimeout(() => mainScreen(), 3000);
            } else {

                showModal(response.status, response.message);
            }
        });
    }

    
}

function destroy() {

    let data = {
        id: $('#id').val(),
        nome: $('#name').val(),
        cpf: $('#cpf').val(),
        cidade: $('#city').val(),
        estado: $('#select-state').val(),
    }

    if (data.id != '') {

        Requests.delete('cadastros/destroy', data, function(response) {

            if (response.status == 'success') {

                showModal(response.status, response.message);
                setTimeout(() => mainScreen(), 3000);
            } else {

                showModal(response.status, response.message);
            }
        });
        
    }
    
}

/* function show() {

    let tbody = $('#registers');

    Requests.get('cadastros', function(response) {
        
        if (response.status == 'success') {

            response.data.forEach(cad => {
                
                let tr = `
                    <tr>
                        <td>${cad.id}</td>
                        <td>${cad.nome}</td>
                        <td>${cad.cpf}</td>
                        <td>${cad.cidade}</td>
                    </tr>
                `;

                tbody.append(tr);
            });

        } else {

            showModal(response.status, response.message);
        }
    });
} */

function findRegisters() {

    showModal('wait');
    let name = $('#name-search').val();
    let cpf = $('#cpf-search').val();
    let tbody = $('#registers');
    let qtdRegs = $('#qtd-regs');

    if (name != '') {

        let data = {
            nome: name
        }

        Requests.post('cadastros/findbyname', data, function(response) {

            if (response.status == 'success') {

                qtdRegs.html(response.count);

                response.data.forEach(cad => {
            
                    let tr = `
                        <tr>
                            <td>${cad.id}</td>
                            <td>${cad.nome}</td>
                            <td>${cad.cpf}</td>
                            <td>${cad.cidade}</td>
                        </tr>
                    `;
    
                    tbody.append(tr);
                });
            } else {

                showModal('error', 'Nenhum registro encontrado.');
            }
        });
    } else {

        if (cpf != '') {

            let data = {
                cpf: cpf
            }

            Requests.post('cadastros/findallbycpf', data, function(response) {
                console.log(response.data.id);
                if (response.status == 'success') {

                    response.data.forEach(cad => {
                
                        let tr = `
                            <tr>
                                <td>${cad.id}</td>
                                <td>${cad.nome}</td>
                                <td>${cad.cpf}</td>
                                <td>${cad.cidade}</td>
                            </tr>
                        `;
        
                        tbody.append(tr);
                    });
                } else {

                    showModal('error', 'Nenhum registro encontrado.');
                }
            });

        } else {

            showModal('error', 'Por favor, preencha um dos campos.');
        }
    }
}

function findByCpf(isUpdate = false) {

    showModal('wait');

    let cpf = $('#cpf-search').val();

    let data = {
        cpf: cpf
    }

    Requests.post('cadastros/findbycpf', data, function(response) {
        
        if (response.status == 'success') {

            let id = $('#id');
            let name = $('#name');
            let cpf = $('#cpf');
            let city = $('#city');
            let btnDestroy = $('#btn-destroy');
            
            id.val(response.data.id);
            name.val(response.data.nome);
            cpf.val(response.data.cpf);
            city.val(response.data.cidade);

            let selEstado = $('#select-state');
            let selTitle = $('#sel-title');

            selTitle.html('Carregando..');

            Requests.get('estados', function(res) {

                if (res.status == 'success') {

                    let control;

                    res.data.forEach(estado => {

                        if (estado.estado == response.data.estado) {
                            control = 'selected';
                        } else {
                            control = '';
                        }

                        let opt = `<option value="${estado.id}" ${control}>${estado.estado}</option>`

                        selEstado.append(opt);
                    });

                    if (isUpdate == true) {
                        selEstado.removeAttr('disabled');
                    }
                    
                    btnDestroy ? btnDestroy.removeClass('d-none') : '';
                    selTitle.html('Escolha o estado');
                } else {

                    console.log(res);
                }
            });

        } else {

            showModal('error', response.message);
        }
    });
}

function cleanTable() {
    let tbody = $('#registers');
    let qtdRegs = $('#qtd-regs');
    let name = $('#name-search');
    let cpf = $('#cpf-search');

    name.val('');
    cpf.val('');

    tbody.html('');
    qtdRegs.html(0);
}

function verifyEmpty(obj) {

    for(let key in obj) {

        if(obj[key] === "") {
           
            return false;
        }
    }

    return true;
}