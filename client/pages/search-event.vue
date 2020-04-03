<template>
    <div class="search-event">
        <form @submit.prevent="submit">
            <v-app id="inspire">
                <v-content>
                    <v-container
                            fluid
                            fill-height
                    >
                        <v-layout
                                align-center
                                justify-center
                        >
                            <v-flex
                                    xs12
                                    sm8
                                    md4
                            >
                                <v-card class="elevation-12">
                                    <v-toolbar
                                            color="primary"
                                            dark
                                            flat
                                    >
                                        <v-toolbar-title>Форма поиска событий</v-toolbar-title>
                                        <v-spacer></v-spacer>
                                    </v-toolbar>
                                    <v-card-text>
                                        <v-form>
                                            <!--                    // Search event-->
                                            <client-only>
                                                <v-text-field
                                                        :class="{ 'form--error': $v.formModel.search.$error }"
                                                        label="Поиск события"
                                                        name="search"
                                                        prepend-icon="search"
                                                        type="text"
                                                        v-model.trim="$v.formModel.search.$model"
                                                        @input="submit"
                                                ></v-text-field>
                                            </client-only>
                                            <div class="errors" v-if="formModel.errors">
                                                <div class="error" v-if="!$v.formModel.search.required">
                                                    {{formModel.errorMessages.required}}
                                                </div>
                                                <div class="error" v-if="!$v.formModel.search.minLength">
                                                    {{formModel.errorMessages.minLength}}
                                                </div>
                                            </div>
                                        </v-form>
                                    </v-card-text>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn color="secondary" @click="resetForm()">Очистить форму</v-btn>
                                        <v-btn color="button primary" type="submit"
                                               :disabled="submitStatus === 'PENDING'">Найти событие
                                        </v-btn>
                                        <v-spacer></v-spacer>
                                    </v-card-actions>
                                    <v-card-text>
                                        <p class="typo__p" v-if="submitStatus === 'OK'">Данные отправлены!</p>
                                        <p class="typo__p" v-if="submitStatus === 'EMPTY'">Пожалуйста, заполните поле
                                            поиска.</p>
                                        <p class="typo__p" v-if="submitStatus === 'PENDING'">Отправляю...</p>
                                        <p class="typo__p" v-if="submitStatus === 'NORESULT'">По запросу не найдено ни
                                            одного события</p>
                                        <p class="typo__p" v-if="submitStatus === 'NETWORKERROR'">Ошибка запроса.
                                            Пожалуйста повторите попытку позже.</p>
                                        <p class="typo__p" v-if="formModel.formTouched">Поле поиска пусто</p>
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-content>
            </v-app>
        </form>

        <v-app class="search-result" v-if="themeResponse.length">
            <v-content>
                <v-container
                        fluid
                        fill-height
                >
                    <v-layout
                            align-center
                            justify-center
                    >
                        <v-flex
                                xs12
                                sm8
                                md4
                        >
                            <v-list>
                                <v-list-item
                                        class="list-item elevation-6"
                                        v-for="item in themeResponse"
                                        :key="item.id"
                                        @click.stop="openDialog(item)">
                                    <v-list-item-title>{{item.theme}}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-flex>
                    </v-layout>
                    <v-dialog
                            v-model="dialog"
                            width="500"
                    >
                        <v-card>
                            <v-card-title
                                    class="headline grey lighten-2"
                                    primary-title
                            >
                                Тема: {{pickedTheme.theme}}
                            </v-card-title>

                            <v-card-text>
                                <br>
                                <b>ФИО:</b> {{pickedTheme.name}} <br> <br>
                                <b>Подразделение:</b> {{pickedTheme.unit}} <br> <br>
                                <b>Событие:</b> {{pickedTheme.eventList}} <br> <br>
                                <b>Содержание:</b> {{pickedTheme.content}} <br> <br>
                            </v-card-text>

                            <v-divider></v-divider>

                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn
                                        color="primary"
                                        text
                                        @click="dialog = false"
                                >
                                    Назад
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-dialog>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>

<script>
    import {required, minLength} from 'vuelidate/lib/validators';
    import axios from 'axios';

    export default {
        data: () => ({
            formModel: {
                search: '',
                errors: null,
                formTouched: null,
                errorMessages: {
                    required: ' * Поле поиска пустое',
                    minLength: 'Для поиска нужно ввести минимум три символа',
                }
            },
            themeResponse: [],
            submitStatus: null,
            debounceTimer: null,
            dialog: false,
            pickedTheme: {},
        }),
        components: {},
        methods: {
            submit() {
                if (this.debounceTimer) clearTimeout(this.debounceTimer);
                this.debounceTimer = setTimeout(() => {
                    this.formModel.formTouched = !this.$v.formModel.$anyDirty;
                    this.formModel.errors = this.$v.formModel.$anyError;
                    if (this.$v.$invalid) {
                        this.submitStatus = 'EMPTY';
                    } else {
                        this.submitStatus = 'PENDING';
                        this.axiosCall();
                    }
                }, 500);
            },
            axiosCall() {
                axios
                    .get('api/get/event',
                        {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            },
                            params: {
                                search: this.formModel.search
                            }
                        })
                    .then(response => {
                        this.themeResponse = response.data.data;
                        this.setSubmitStatus();
                    })
                    .catch(err => {
                        console.log(err);
                        this.networkErrors.push(err);
                        this.submitStatus = 'NETWORKERROR';
                    })
            },
            resetForm() {
                this.formModel.search = '';
                this.formModel.errors = null;
                this.formModel.formTouched = null;
                this.submitStatus = null;
                this.themeResponse = [];
                this.$v.$reset();
            },
            setSubmitStatus() {
                if (this.themeResponse.length === 0) {
                    this.submitStatus = 'NORESULT';
                } else {
                    this.submitStatus = 'OK';
                }
            },
            openDialog(item) {
                this.pickedTheme = item;
                this.dialog = true;
            }
        },
        validations: {
            formModel: {
                search: {
                    required,
                    minLength: minLength(3),
                },
            }
        },
    }
</script>

<style lang="scss">
    .v-application--wrap {
        min-height: initial !important;
    }

    .form--error {
        input {
            background-color: rgba(255, 0, 0, 0.27);
        }
    }

    .errors {
        position: relative;
        top: -19px;
        padding-left: 33px;

        & > .error {
            padding-left: 5px;
            background-color: rgba(255, 0, 0, 0.27) !important;
            color: #000;
            text-align: left;
        }
    }

    .search-result {
        .list-item {
            border: 1px solid #000;
            cursor: pointer;

            &:not(:first-child) {
                border-top: none;
            }
        }
    }

    #nav {
        .nuxt-link-exact-active {
            color: #41b883;
        }
    }
</style>
