<template>
  <div class="add-event">
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
                    <v-toolbar-title>Форма добавления событий</v-toolbar-title>
                    <v-spacer></v-spacer>
                  </v-toolbar>
                  <v-card-text>
                    <v-form>
                      <!--                    // Name-->
                      <client-only>
                      <v-text-field
                              :class="{ 'form--error': $v.formModel.name.$error }"
                              label="ФИО"
                              name="name"
                              prepend-icon="person"
                              type="text"
                              v-model.trim="$v.formModel.name.$model"
                      ></v-text-field>
                      </client-only>
                      <div class="errors" v-if="formModel.errors">
                        <div class="error" v-if="!$v.formModel.name.required">
                          {{formModel.errorMessages.required}}
                        </div>
                        <div class="error" v-if="!$v.formModel.name.minLength">
                          {{formModel.errorMessages.min}} {{
                          $v.formModel.name.$params.minLength.min }} знака.
                        </div>
                      </div>
                      <!--                    // Unit-->
                      <client-only>
                      <v-text-field
                              :class="{ 'form--error': $v.formModel.unit.$error }"
                              id="unit"
                              label="Подразделение"
                              name="unit"
                              prepend-icon="group"
                              type="text"
                              v-model.trim="$v.formModel.unit.$model"
                      ></v-text-field>
                      </client-only>
                      <div class="errors" v-if="formModel.errors">
                        <div class="error" v-if="!$v.formModel.unit.required">
                          {{formModel.errorMessages.required}}
                        </div>
                        <div class="error" v-if="!$v.formModel.unit.minLength">
                          {{formModel.errorMessages.min}} {{
                          $v.formModel.name.$params.minLength.min }} знака.
                        </div>
                      </div>
                      <!--                    // Event list-->
                      <client-only>
                      <v-select
                              :class="{ 'form--error': $v.formModel.eventList.$error }"
                              :items="eventsList"
                              name="eventList"
                              label="Список событий"
                              prepend-icon="format_list_bulleted"
                              v-model.trim="$v.formModel.eventList.$model"
                      ></v-select>
                      </client-only>
                      <div class="errors" v-if="formModel.errors">
                        <div class="error" v-if="!$v.formModel.eventList.required">
                          {{formModel.errorMessages.required}}
                        </div>
                      </div>
                      <!--                    // Theme-->
                      <client-only>
                      <v-text-field
                              :class="{ 'form--error': $v.formModel.theme.$error }"
                              id="theme"
                              label="Тема"
                              name="theme"
                              prepend-icon="title"
                              type="text"
                              v-model.trim="$v.formModel.theme.$model"
                      ></v-text-field>
                      </client-only>
                      <div class="errors" v-if="formModel.errors">
                        <div class="error" v-if="!$v.formModel.theme.required">
                          {{formModel.errorMessages.required}}
                        </div>
                        <div class="error" v-if="!$v.formModel.theme.minLength">
                          {{formModel.errorMessages.min}} {{
                          $v.formModel.name.$params.minLength.min }} знака.
                        </div>
                      </div>
                      <!--                    //Content-->
                      <client-only>
                      <v-textarea
                              :class="{ 'form--error': $v.formModel.content.$error }"
                              id="content"
                              label="Содержание"
                              name="content"
                              prepend-icon="text_fields"
                              type="text"
                              v-model.trim="$v.formModel.content.$model"
                      ></v-textarea>
                      </client-only>
                      <div class="errors" v-if="formModel.errors">
                        <div class="error" v-if="!$v.formModel.content.required">
                          {{formModel.errorMessages.required}}
                        </div>
                        <div class="error" v-if="!$v.formModel.content.minLength">
                          {{formModel.errorMessages.min}} {{
                          $v.formModel.name.$params.minLength.min }} знака.
                        </div>
                      </div>
                      <!--                    // Date picker-->
                      <client-only>
                      <v-menu
                              v-model="formModel.fromDateMenu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  label="Дата"
                                  prepend-icon="event"
                                  readonly
                                  :value="fromDateDisp"
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                                locale="ru"
                                v-model="fromDateVal"
                                no-title
                                @input="formModel.fromDateMenu = false"
                                :min="minDate"
                        ></v-date-picker>
                      </v-menu>
                      </client-only>
                      <!--                    // Time picker-->
                      <v-menu
                              v-if="isBrowser"
                              v-model="formModel.fromTimeMenu"
                              :close-on-content-click="false"
                              :nudge-right="40"
                              transition="scale-transition"
                              offset-y
                              max-width="290px"
                              min-width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                                  label="Время"
                                  prepend-icon="access_time"
                                  readonly
                                  :value="fromTimeDisp"
                                  v-on="on"
                          ></v-text-field>
                        </template>
                        <v-time-picker
                                :format="format"
                                v-model="fromTimeVal"
                                no-title
                                @input="formModel.fromTimeMenu = false"
                        ></v-time-picker>
                      </v-menu>
                    </v-form>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="secondary" @click="resetForm()">Очистить форму</v-btn>
                    <v-btn color="button primary" type="submit"
                           :disabled="submitStatus === 'PENDING'">Добавить событие
                    </v-btn>
                    <v-spacer></v-spacer>
                  </v-card-actions>
                  <v-card-text>
                    <p class="typo__p" v-if="submitStatus === 'OK'">Событие отправлено!</p>
                    <p class="typo__p" v-if="submitStatus === 'ERROR'">Пожалуйста, заполните форму
                      корректно.</p>
                    <p class="typo__p" v-if="submitStatus === 'PENDING'">Отправляю...</p>
                    <p class="typo__p" v-if="submitStatus === 'NETWORKERROR'">Ошибка запроса. Пожалуйста повторите попытку позже.</p>
                    <p class="typo__p" v-if="formModel.formTouched">Все требуемые поля пустые</p>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-content>
      </v-app>
    </form>
  </div>
</template>

<script>
  // @ is an alias to /src
  import {required, minLength} from 'vuelidate/lib/validators'
  import axios from 'axios';
  import qs from 'querystring';

  export default {
    data: () => ({
      isBrowser: false,
      formModel: {
        name: '',
        unit: '',
        eventList: '',
        theme: '',
        content: '',
        fromDateMenu: false,
        fromTimeMenu: false,
        errors: null,
        formTouched: null,
        errorMessages: {
          required: ' * Обязательное поле',
          min: ' * Поле должно содержать минимум'
        }
      },
      networkErrors: [],
      submitStatus: null,
      eventsList: ['Foo', 'Bar', 'Fizz', 'Buzz'],
      fromDateVal: new Date().toISOString().substr(0, 10),
      fromTimeVal: new Date().toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}),
      minDate: "2020-01-05",
      format: '24hr',
    }),
    methods: {
      submit() {
        this.formModel.formTouched = !this.$v.formModel.$anyDirty;
        this.formModel.errors = this.$v.formModel.$anyError;
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR';
        } else {
          this.submitStatus = 'PENDING';
          this.axiosCall();
        }
      },
      axiosCall() {
        let preparedObject = qs.stringify({...this.formModel, ...{fromDateMenu: this.fromDateVal}, ...{fromTimeMenu: this.fromTimeVal}});
        axios.post('/send',
                preparedObject, {
                  headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                  }
                })
                .then(() => {
                  this.submitStatus = 'OK';
                  this.resetForm(true);
                })
                .catch(err => {
                  console.log(err);
                  this.networkErrors.push(err);
                  this.submitStatus = 'NETWORKERROR';
                })
      },
      resetForm(partially) {
        this.formModel.name = '';
        this.formModel.unit = '';
        this.formModel.eventList = '';
        this.formModel.theme = '';
        this.formModel.content = '';
        this.formModel.errors = null;
        this.formModel.formTouched = null;
        this.$v.$reset();
        if (partially) return;
        this.submitStatus = null;
      }
    },
    computed: {
      fromDateDisp() {
        return this.fromDateVal;
        // format/do something with date
      },
      fromTimeDisp() {
        return this.fromTimeVal;
        // format/do something with date
      },
    },
    mounted () {
      this.isBrowser = process.browser;
    },
    validations: {
      formModel: {
        name: {
          required,
          minLength: minLength(2),
        },
        unit: {
          required,
          minLength: minLength(2),
        },
        eventList: {
          required,
        },
        theme: {
          required,
          minLength: minLength(3),
        },
        content: {
          required,
          minLength: minLength(2),
        }
      }
    }
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
</style>
