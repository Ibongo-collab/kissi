<template>
    <div class="avatar">
        <div class="avatar-container">
            <div class="avatar-upload">
                <div class="avatar-edit">
                    <input type="file" id="imageUpload" accept=".png, .jpg, .jpeg" @change="updateProfileImage($event)">
                    <label for="imageUpload">
                        <i class='bx bxs-pencil'></i>
                    </label>
                </div>
                <div class="avatar-preview">
                    <div id="clock" :style="'background-image: url(\'' + profileImage + '\')'"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Avatar',
        data() {
            return {
                profileImage: 'https://img.freepik.com/free-icon/user_318-159711.jpg',
            }
        },
        methods: {
            updateProfileImage(e) {
                if (e.target.files.length > 0) {
                    if (
                        e.target.files[0].type === 'image/jpeg' ||
                        e.target.files[0].type === 'image/jpg' ||
                        e.target.files[0].type === 'image/png' ||
                        e.target.files[0].type === 'image/tiff' ||
                        e.target.files[0].type === 'image/webp'
                    ) {
                        const file = e.target.files[0];
                        this.profileImage = URL.createObjectURL(file);
                        console.log(this.profileImage);
                    } else {
                        alert('Veuillez sélectionner un format d\'image correct.');
                    }
                }
            }
        }
    }
</script>

<style lang="css">
    .avatar-container {
        text-align: center;
    }

    .avatar-upload {
        position: relative;
        max-width: 130px;
        height: auto;
        margin: 50px auto;
        /* border: 1px solid black; */
    }

    .avatar-upload .avatar-edit {
        position: absolute;
        right: 12px;
        z-index: 2;
        top: 10px;
        
    }

    .avatar-upload .avatar-edit input {
        display: none;
    }

    .avatar-upload .avatar-edit input+label {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin-bottom: 0;
        border-radius: 100%;
        background: #FFFFFF;
        border: 1px solid transparent;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        font-weight: normal;
        transition: all 0.2s ease-in-out;
        padding: 15%;
    }

    .avatar-upload .avatar-edit input+label:hover {
        background: #f1f1f1;
        border-color: #d6d6d6;
    }

    /* .avatar-upload .avatar-edit input+label:after {
        content: "\f040";
        font-family: 'FontAwesome';
        color: #757575;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        text-align: center;
        margin: auto;
    } */

    .avatar-upload .avatar-preview {
        width: 120px;
        height: 120px;
        position: relative;
        border-radius: 100%;
        border: 6px solid #F8F8F8;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    }

    .avatar-upload .avatar-preview>div {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>